import { NextResponse } from "next/server";

export const runtime = "nodejs";

type TutorRequest = {
  question?: string;
  topic?: string;
};

export async function POST(request: Request) {
  let body: TutorRequest;
  try {
    body = (await request.json()) as TutorRequest;
  } catch {
    return NextResponse.json({ error: "Please enter a maths question." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "Grade 9 mathematics";

  if (!question) {
    return NextResponse.json({ error: "Type a question first." }, { status: 400 });
  }
  if (question.length > 1800) {
    return NextResponse.json({ error: "Please keep your question under 1,800 characters." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      mode: "demo",
      answer: demoAnswer(question),
      note: "Demo tutor: add OPENAI_API_KEY to your local environment to enable open-ended AI answers."
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.25,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content: [
              "You are MathsAI Academy, a patient and encouraging Grade 9 mathematics tutor for a Kenyan learner.",
              "Teach, do not shame. Use clear simple English, short steps, and age-appropriate examples.",
              "When solving a problem, show the method and verify the result. If a question is ambiguous, ask one concise clarifying question.",
              "Encourage the learner to attempt a step themselves when useful. Do not claim to know official exam answers.",
              "Keep responses focused on mathematics. For unrelated or unsafe requests, gently redirect to learning.",
              "Use readable math notation and explain symbols."
            ].join(" ")
          },
          {
            role: "user",
            content: `Topic: ${topic}\nLearner's question: ${question}`
          }
        ]
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: "The tutor service could not answer right now. Please try again shortly." }, { status: 502 });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json({ error: "The tutor returned an empty answer. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ mode: "ai", answer: answer.trim() });
  } catch {
    return NextResponse.json({ error: "Could not connect to the tutor. Check your connection and try again." }, { status: 502 });
  }
}

function demoAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("integer") || q.includes("negative")) {
    return "Integers are whole numbers, their negatives, and zero.\n\nExample: −3 + 7 = 4. When adding numbers with different signs, subtract their sizes (7 − 3 = 4) and keep the sign of the number with the larger size.\n\nTry this: −6 + 10 = ?";
  }
  if (q.includes("cube root") || q.includes("cube")) {
    return "A cube root asks which number, multiplied by itself three times, gives the number you started with.\n\nExample: 4 × 4 × 4 = 64, so ∛64 = 4.\n\nTry this: what is ∛27?";
  }
  if (q.includes("index") || q.includes("power") || q.includes("indices")) {
    return "An index tells you how many times to multiply a base by itself. For example, 2³ = 2 × 2 × 2 = 8.\n\nWhen multiplying powers with the same base, add the indices: 2² × 2³ = 2⁵ = 32.\n\nTry: simplify 3² × 3¹.";
  }
  if (q.includes("speed") || q.includes("distance")) {
    return "Remember these three relationships:\n• Speed = distance ÷ time\n• Distance = speed × time\n• Time = distance ÷ speed\n\nExample: 120 km in 2 hours gives speed = 120 ÷ 2 = 60 km/h. Always include the correct units.";
  }
  if (q.includes("trigonometry") || q.includes("sine") || q.includes("cosine") || q.includes("tangent")) {
    return "For a right-angled triangle, remember SOH–CAH–TOA:\n• sin θ = opposite ÷ hypotenuse\n• cos θ = adjacent ÷ hypotenuse\n• tan θ = opposite ÷ adjacent\n\nFirst identify the angle, then label the opposite, adjacent and hypotenuse sides.";
  }
  if (q.includes("matrix") || q.includes("matrices")) {
    return "A matrix is a rectangular arrangement of numbers in rows and columns. Its order is rows × columns. A matrix with 2 rows and 3 columns has order 2 × 3. When adding matrices of the same order, add entries in matching positions.";
  }
  return "I can help you learn this step by step. Start by identifying what the question gives you and what you need to find.\n\nTry sending the full maths question and tell me which part is confusing. This starter version has a few built-in examples; add an AI API key to enable open-ended tutoring.";
}
