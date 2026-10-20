"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, BookOpen, BrainCircuit, Check, ChevronRight, CircleHelp,
  Clock3, Lightbulb, Menu, MessageCircle, Play, Search, ShieldCheck,
  Sparkles, Target, Trophy, X, Zap
} from "lucide-react";

type Topic = {
  id: number;
  unit: string;
  title: string;
  description: string;
  lessons: number;
  progress: number;
  icon: string;
  color: "mint" | "blue" | "peach" | "lavender";
  sample: string;
};

const topics: Topic[] = [
  { id: 1, unit: "NUMBERS", title: "Integers", description: "Add, subtract, multiply and divide positive and negative numbers.", lessons: 5, progress: 100, icon: "±", color: "mint", sample: "−7 + 12 = 5" },
  { id: 2, unit: "NUMBERS", title: "Cubes and cube roots", description: "Explore cube numbers and find their cube roots.", lessons: 3, progress: 65, icon: "∛", color: "blue", sample: "∛64 = 4" },
  { id: 3, unit: "NUMBERS", title: "Indices and logarithms", description: "Understand powers, index laws and the idea of logarithms.", lessons: 5, progress: 20, icon: "xⁿ", color: "peach", sample: "2³ = 8" },
  { id: 4, unit: "NUMBERS", title: "Compound proportion and rates of work", description: "Solve problems involving rates of work and compound proportion.", lessons: 4, progress: 0, icon: "↗", color: "lavender", sample: "More workers → less time" },
  { id: 5, unit: "ALGEBRA", title: "Matrices", description: "Read, arrange and calculate with numbers in matrices.", lessons: 4, progress: 0, icon: "[ ]", color: "blue", sample: "A = [1  2; 3  4]" },
  { id: 6, unit: "ALGEBRA", title: "Equations of straight lines", description: "Connect coordinates, gradients and straight-line equations.", lessons: 5, progress: 0, icon: "y=", color: "mint", sample: "y = 2x + 1" },
  { id: 7, unit: "ALGEBRA", title: "Linear inequalities", description: "Solve inequalities and show solutions on a number line.", lessons: 4, progress: 0, icon: "≤", color: "peach", sample: "x + 3 < 8 → x < 5" },
  { id: 8, unit: "MEASUREMENT", title: "Area", description: "Calculate areas of common shapes and compound figures.", lessons: 4, progress: 0, icon: "▱", color: "lavender", sample: "Rectangle: length × width" },
  { id: 9, unit: "MEASUREMENT", title: "Volume of solids", description: "Calculate the space occupied by 3D objects.", lessons: 4, progress: 0, icon: "⬡", color: "blue", sample: "Cuboid: l × w × h" },
  { id: 10, unit: "MEASUREMENT", title: "Mass, volume, weight and density", description: "Use units and formulas to connect mass, volume and density.", lessons: 4, progress: 0, icon: "⚖", color: "mint", sample: "Density = mass ÷ volume" },
  { id: 11, unit: "MEASUREMENT", title: "Time, distance and speed", description: "Use the speed-distance-time relationship in real situations.", lessons: 4, progress: 0, icon: "◷", color: "peach", sample: "Speed = distance ÷ time" },
  { id: 12, unit: "MEASUREMENT", title: "Money", description: "Practise money calculations and everyday financial maths.", lessons: 4, progress: 0, icon: "KSh", color: "lavender", sample: "Change = amount paid − cost" },
  { id: 13, unit: "MEASUREMENT", title: "Approximations and errors", description: "Round numbers and understand bounds and measurement error.", lessons: 4, progress: 0, icon: "≈", color: "blue", sample: "3.746 ≈ 3.75 (2 d.p.)" },
  { id: 14, unit: "GEOMETRY", title: "Coordinates and graphs", description: "Plot points and read information from graphs.", lessons: 5, progress: 0, icon: "⌗", color: "mint", sample: "(x, y)" },
  { id: 15, unit: "GEOMETRY", title: "Scale drawing", description: "Use scales to represent real distances and measurements.", lessons: 3, progress: 0, icon: "↔", color: "peach", sample: "1 cm represents 5 km" },
  { id: 16, unit: "GEOMETRY", title: "Similarity and enlargement", description: "Compare shapes and use scale factors to enlarge figures.", lessons: 4, progress: 0, icon: "◫", color: "lavender", sample: "New length = scale factor × original" },
  { id: 17, unit: "GEOMETRY", title: "Trigonometry", description: "Use sine, cosine and tangent in right-angled triangles.", lessons: 5, progress: 0, icon: "△", color: "blue", sample: "sin θ = opposite ÷ hypotenuse" },
  { id: 18, unit: "DATA & PROBABILITY", title: "Data interpretation (grouped data)", description: "Interpret grouped data, tables and frequency information.", lessons: 4, progress: 0, icon: "▥", color: "mint", sample: "Frequency tells how often" },
  { id: 19, unit: "DATA & PROBABILITY", title: "Probability", description: "Describe likelihood and calculate simple probabilities.", lessons: 4, progress: 0, icon: "◉", color: "peach", sample: "P(event) = favourable ÷ total" },
  { id: 20, unit: "REFERENCE", title: "Mathematical tables", description: "Learn how to use tables for cubes and trigonometric values.", lessons: 3, progress: 0, icon: "▤", color: "lavender", sample: "Find a value using row and column" }
];

const filters = ["All topics", "Numbers", "Algebra", "Measurement", "Geometry", "Data & probability", "Reference"];
const questionBank = [
  { prompt: "Calculate: −8 + 13", answer: "5", hint: "Start at −8 on the number line and move 13 steps to the right.", explain: "−8 + 13 = 5. Since 13 is larger than 8, the answer is positive. Subtract 13 − 8 = 5." },
  { prompt: "What is the cube root of 125?", answer: "5", hint: "Which number multiplied by itself three times gives 125?", explain: "5 × 5 × 5 = 125, so ∛125 = 5." },
  { prompt: "Simplify: 2³ × 2²", answer: "32", hint: "When multiplying powers with the same base, add the indices.", explain: "2³ × 2² = 2⁽³⁺²⁾ = 2⁵ = 32." },
  { prompt: "A car travels 150 km in 3 hours. Find its average speed.", answer: "50", hint: "Speed = distance ÷ time. Give your numerical answer in km/h.", explain: "Speed = 150 ÷ 3 = 50 km/h." }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All topics");
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showTutor, setShowTutor] = useState(false);
  const [tutorQuestion, setTutorQuestion] = useState("");
  const [tutorReply, setTutorReply] = useState("");
  const [tutorMode, setTutorMode] = useState<"demo" | "ai" | "">("");
  const [tutorNote, setTutorNote] = useState("");
  const [tutorLoading, setTutorLoading] = useState(false);
  const [tutorError, setTutorError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState<"lesson" | "practice">("lesson");

  const filteredTopics = useMemo(() => topics.filter((topic) => {
    const category = activeFilter.toUpperCase();
    const matchesFilter = activeFilter === "All topics" || topic.unit.includes(category);
    const matchesSearch = `${topic.title} ${topic.description} ${topic.unit}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [activeFilter, search]);

  const currentQuestion = questionBank[practiceIndex];
  const overallProgress = Math.round((completed.length / topics.length) * 100);
  const isCorrect = answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

  function submitPractice() {
    setChecked(true);
    if (isCorrect) setCompleted((old) => old.includes(practiceIndex + 1) ? old : [...old, practiceIndex + 1]);
  }

  function nextQuestion() {
    setPracticeIndex((old) => (old + 1) % questionBank.length);
    setAnswer("");
    setChecked(false);
    setShowHint(false);
  }

  async function askTutor(event?: React.FormEvent) {
    event?.preventDefault();
    const question = tutorQuestion.trim();
    if (!question || tutorLoading) return;
    setTutorLoading(true);
    setTutorError("");
    setTutorReply("");
    setTutorMode("");
    setTutorNote("");
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, topic: selectedTopic?.title ?? "Grade 9 mathematics" })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The tutor could not respond.");
      setTutorReply(data.answer);
      setTutorMode(data.mode || "demo");
      setTutorNote(data.note || "");
    } catch (error) {
      setTutorError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setTutorLoading(false);
    }
  }

  function setSuggestedQuestion(question: string) {
    setTutorQuestion(question);
    setTutorReply("");
    setTutorError("");
    setTutorMode("");
    setTutorNote("");
  }

  return (
    <main>
      <div className="announcement"><Sparkles size={14} /> Your friendly Grade 9 maths study space <span className="announcement-dot">•</span> Built for curious minds in Kenya</div>
      <header className="site-header">
        <a href="#" className="brand" aria-label="MathsAI Academy home">
          <span className="brand-mark"><span>∑</span></span>
          <span className="brand-text">Maths<span>AI</span> Academy<small>LEARN WITH CONFIDENCE</small></span>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#learn" onClick={() => setMenuOpen(false)}>Learn</a>
          <a href="#practice" onClick={() => setMenuOpen(false)}>Practice</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-quiet header-tutor" onClick={() => setShowTutor(true)}><BrainCircuit size={17} /> Ask AI tutor</button>
          <a href="#learn" className="btn btn-dark">Start learning <ArrowRight size={16} /></a>
        </div>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-star">✳</span> YOUR MATHS JOURNEY STARTS HERE</div>
          <h1>Big maths goals.<br /><span>One small step</span><br />at a time.</h1>
          <p className="hero-description">Understand the why, practise at your pace, and build real confidence in Grade 9 mathematics. You can do this.</p>
          <div className="hero-buttons">
            <a href="#learn" className="btn btn-primary">Explore Grade 9 maths <ArrowRight size={17} /></a>
            <button className="btn btn-outline" onClick={() => setShowTutor(true)}><MessageCircle size={17} /> Meet your AI tutor</button>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack"><span>J</span><span>A</span><span>M</span><span>+</span></div>
            <p><strong>Every learner can improve.</strong><br /><span>Learn it. Try it. Get better.</span></p>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of a maths study notebook">
          <div className="sun-shape"></div><div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✳</div>
          <div className="floating-note note-top"><span className="note-icon"><Lightbulb size={17} /></span><span><b>Understand</b><small>Ideas made simple</small></span></div>
          <div className="notebook">
            <div className="notebook-top"><span className="notebook-label">TODAY'S LITTLE WIN</span><span className="green-dot"></span></div>
            <div className="notebook-title">Maths can<br />make sense.</div>
            <div className="notebook-line"></div>
            <div className="equation"><span>3</span><span className="eq-plus">+</span><span>4</span><span className="eq-equals">=</span><span className="eq-result">7</span></div>
            <div className="notebook-foot"><span className="check-round"><Check size={14} /></span> One step at a time</div>
          </div>
          <div className="floating-note note-bottom"><span className="trophy-bubble"><Trophy size={18} /></span><span><b>Progress, not perfection</b><small>Celebrate each step</small></span></div>
          <div className="math-doodle doodle-one">x² + y²</div><div className="math-doodle doodle-two">π ≈ 3.14</div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Learning highlights">
        <div className="stat-item"><span className="stat-icon stat-mint"><BookOpen size={20} /></span><span><b>20 core topics</b><small>Grade 9 pathway</small></span></div>
        <div className="stat-item"><span className="stat-icon stat-peach"><Target size={20} /></span><span><b>Learn at your pace</b><small>One idea at a time</small></span></div>
        <div className="stat-item"><span className="stat-icon stat-blue"><BrainCircuit size={20} /></span><span><b>Friendly AI tutor</b><small>AI-ready tutor endpoint</small></span></div>
        <div className="stat-item"><span className="stat-icon stat-lavender"><ShieldCheck size={20} /></span><span><b>Safe learning</b><small>Built to support learners</small></span></div>
      </section>

      <section className="learning-section section-wrap" id="learn">
        <div className="section-heading">
          <div><div className="eyebrow">YOUR LEARNING PATH</div><h2>Find your next <span>“aha!” moment.</span></h2><p>Choose a topic, learn the idea, then practise until it clicks.</p></div>
          <div className="progress-card"><div className="progress-card-top"><span>Your learning journey</span><span className="progress-number">{overallProgress}%</span></div><div className="progress-track"><span style={{ width: `${overallProgress}%` }}></span></div><small>{completed.length} of {topics.length} topics started or completed this session</small></div>
        </div>
        <div className="topic-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Filter topics">
            {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "filter-tab active" : "filter-tab"} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <label className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find a topic..." aria-label="Search topics" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={14} /></button>}</label>
        </div>
        <div className="topic-grid">
          {filteredTopics.map((topic) => (
            <article className="topic-card" key={topic.id}>
              <div className="topic-card-top"><span className={`topic-icon ${topic.color}`}>{topic.icon}</span><span className="topic-number">TOPIC {String(topic.id).padStart(2, "0")}</span><button className="card-more" onClick={() => { setSelectedTopic(topic); setActiveTab("lesson"); }} aria-label={`Open ${topic.title}`}><ChevronRight size={18} /></button></div>
              <div className="topic-unit">{topic.unit}</div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="topic-card-bottom"><span><BookOpen size={14} /> {topic.lessons} mini lessons</span><span className={topic.progress === 100 ? "status status-done" : topic.progress > 0 ? "status status-going" : "status"}>{topic.progress === 100 ? "Completed" : topic.progress > 0 ? "In progress" : "Not started"}</span></div>
              <div className="mini-progress"><span style={{ width: `${topic.progress}%` }}></span></div>
              <button className="topic-open" onClick={() => { setSelectedTopic(topic); setActiveTab("lesson"); }}>{topic.progress === 100 ? "Review topic" : topic.progress > 0 ? "Continue learning" : "Explore topic"} <ArrowRight size={15} /></button>
            </article>
          ))}
          {filteredTopics.length === 0 && <div className="empty-state"><Search size={26} /><h3>No topics found</h3><p>Try another word or choose “All topics”.</p><button className="btn btn-outline" onClick={() => { setSearch(""); setActiveFilter("All topics"); }}>Show all topics</button></div>}
        </div>
      </section>

      <section className="practice-section" id="practice">
        <div className="practice-inner">
          <div className="practice-copy"><div className="eyebrow">A LITTLE PRACTICE GOES A LONG WAY</div><h2>Ready for a quick<br /><span>brain workout?</span></h2><p>Try a question, check your thinking, and learn from every answer. Mistakes are part of learning.</p><div className="practice-perks"><span><Check size={16} /> Friendly explanations</span><span><Check size={16} /> Hints when you need them</span><span><Check size={16} /> Try as many times as you like</span></div></div>
          <div className="quiz-card">
            <div className="quiz-top"><span className="quiz-label"><Zap size={15} /> QUICK PRACTICE</span><span className="question-count">Question {practiceIndex + 1} of {questionBank.length}</span></div>
            <div className="quiz-progress"><span style={{ width: `${((practiceIndex + 1) / questionBank.length) * 100}%` }}></span></div>
            <div className="quiz-topic">NUMBER SENSE · GRADE 9</div>
            <h3>{currentQuestion.prompt}</h3>
            <label className="answer-label" htmlFor="answer">Your answer</label>
            <input id="answer" className="answer-input" value={answer} onChange={(e) => { setAnswer(e.target.value); setChecked(false); }} placeholder="Type your answer here..." onKeyDown={(e) => { if (e.key === "Enter") submitPractice(); }} />
            {showHint && <div className="hint-box"><Lightbulb size={16} /><span>{currentQuestion.hint}</span></div>}
            {checked && <div className={isCorrect ? "feedback correct" : "feedback incorrect"}><span className="feedback-icon">{isCorrect ? <Check size={16} /> : <CircleHelp size={16} />}</span><div><b>{isCorrect ? "You got it!" : "Not quite — keep going!"}</b><p>{currentQuestion.explain}</p></div></div>}
            <div className="quiz-actions"><button className="btn btn-outline hint-button" onClick={() => setShowHint(!showHint)}><Lightbulb size={16} /> {showHint ? "Hide hint" : "Need a hint?"}</button>{checked ? <button className="btn btn-primary" onClick={nextQuestion}>Next question <ArrowRight size={15} /></button> : <button className="btn btn-dark" onClick={submitPractice}>Check answer <Check size={15} /></button>}</div>
            <div className="quiz-footer"><ShieldCheck size={14} /> This is a practice space. Learn at your own pace.</div>
          </div>
        </div>
      </section>

      <section className="how-section section-wrap" id="how-it-works">
        <div className="center-heading"><div className="eyebrow">A SIMPLE WAY TO GET BETTER</div><h2>Learn it. Try it. <span>Own it.</span></h2><p>No pressure to be perfect. Just keep making progress.</p></div>
        <div className="steps-grid">
          <div className="step-card"><span className="step-number">01</span><span className="step-icon step-mint"><BookOpen size={22} /></span><h3>Learn the idea</h3><p>Short, clear explanations with examples you can follow line by line.</p></div>
          <div className="step-card"><span className="step-number">02</span><span className="step-icon step-peach"><Play size={22} /></span><h3>Try it yourself</h3><p>Practise with questions that help you use what you have just learned.</p></div>
          <div className="step-card"><span className="step-number">03</span><span className="step-icon step-blue"><MessageCircle size={22} /></span><h3>Ask for help</h3><p>Get a hint, see another example, or ask the tutor to explain it differently.</p></div>
          <div className="step-card"><span className="step-number">04</span><span className="step-icon step-lavender"><Trophy size={22} /></span><h3>Notice your growth</h3><p>Keep track of the topics you have tried and celebrate small wins.</p></div>
        </div>
      </section>

      <section className="tutor-cta">
        <div className="cta-orb"><BrainCircuit size={33} /></div>
        <div className="cta-copy"><div className="eyebrow">STUCK ON A QUESTION?</div><h2>There’s no such thing as a silly question.</h2><p>Ask for an explanation, a worked example, or a practice question.</p></div>
        <button className="btn btn-white" onClick={() => setShowTutor(true)}>Ask the maths tutor <ArrowRight size={16} /></button>
        <span className="cta-doodle">x + y = ✨</span>
      </section>

      <footer className="site-footer"><a href="#" className="brand footer-brand"><span className="brand-mark"><span>∑</span></span><span className="brand-text">Maths<span>AI</span> Academy<small>LEARN WITH CONFIDENCE</small></span></a><p>Made for learners. Built for understanding.</p><div className="footer-links"><a href="#learn">Topics</a><a href="#practice">Practice</a><a href="#how-it-works">Our approach</a></div><div className="footer-bottom"><span>© 2026 MathsAI Academy</span><span>Curriculum-aligned learning · Original practice content</span></div></footer>

      {selectedTopic && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedTopic(null); }}><section className="topic-modal" role="dialog" aria-modal="true" aria-labelledby="topic-modal-title"><button className="modal-close" onClick={() => setSelectedTopic(null)} aria-label="Close topic"><X size={20} /></button><div className="modal-kicker"><span className={`topic-icon ${selectedTopic.color}`}>{selectedTopic.icon}</span><span>TOPIC {String(selectedTopic.id).padStart(2, "0")} · {selectedTopic.unit}</span></div><h2 id="topic-modal-title">{selectedTopic.title}</h2><p className="modal-description">{selectedTopic.description}</p><div className="modal-tabs"><button className={activeTab === "lesson" ? "modal-tab active" : "modal-tab"} onClick={() => setActiveTab("lesson")}><BookOpen size={15} /> Learn</button><button className={activeTab === "practice" ? "modal-tab active" : "modal-tab"} onClick={() => setActiveTab("practice")}><Target size={15} /> Practice</button></div>{activeTab === "lesson" ? <div className="lesson-preview"><div className="lesson-callout"><Lightbulb size={18} /><div><b>Big idea</b><p>{selectedTopic.description} The best way to learn is to understand one step, then try it with an example.</p></div></div><h3>Remember this</h3><div className="formula-box">{selectedTopic.sample}</div><h3>Your learning steps</h3><ol className="lesson-steps"><li><span>1</span>Understand the key words and idea.</li><li><span>2</span>Follow a worked example step by step.</li><li><span>3</span>Try a question without looking at the answer.</li><li><span>4</span>Check your work and learn from mistakes.</li></ol></div> : <div className="lesson-preview"><div className="practice-mini"><span className="quiz-label"><Zap size={14} /> TRY THIS</span><h3>{selectedTopic.title}: practise the idea</h3><p>Explain the main rule for this topic in your own words. Then ask the tutor for a question at your level.</p><button className="btn btn-primary" onClick={() => { setSelectedTopic(null); setShowTutor(true); setSuggestedQuestion(`Give me a Grade 9 practice question about ${selectedTopic.title}, with a hint but don't show the answer yet.`); }}>Get a practice question <ArrowRight size={15} /></button></div></div>}<div className="modal-bottom"><span><Clock3 size={15} /> {selectedTopic.lessons} mini lessons</span><button className="btn btn-dark" onClick={() => { setCompleted((old) => old.includes(selectedTopic.id) ? old : [...old, selectedTopic.id]); setSelectedTopic(null); }}>Mark topic started <Check size={15} /></button></div></section></div>}

      {showTutor && <div className="modal-backdrop tutor-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget && !tutorLoading) setShowTutor(false); }}><section className="tutor-modal" role="dialog" aria-modal="true" aria-labelledby="tutor-modal-title"><div className="tutor-modal-head"><div className="tutor-avatar"><BrainCircuit size={23} /></div><div><h2 id="tutor-modal-title">Your maths buddy</h2><p><span className="online-dot"></span> Ready to help you learn</p></div><button className="modal-close" onClick={() => setShowTutor(false)} aria-label="Close tutor"><X size={20} /></button></div><div className="tutor-chat"><div className="chat-message tutor-message"><span className="chat-icon"><Sparkles size={15} /></span><div><b>Hey there!</b><p>I'm here to help you understand maths, one step at a time. Ask me about a topic, a formula, or a question you're stuck on.</p><p className="chat-small">Tip: tell me which step is confusing, and we'll start there.</p></div></div>{tutorQuestion && tutorReply && <div className="chat-message user-message"><p>{tutorQuestion}</p></div>}{tutorLoading && <div className="chat-message tutor-message"><span className="chat-icon"><Sparkles size={15} /></span><div><b>Thinking through it…</b><p>Putting the steps together for you.</p></div></div>}{tutorReply && <div className="chat-message tutor-message"><span className="chat-icon"><Sparkles size={15} /></span><div><b>Let's work it out</b><p className="tutor-answer">{tutorReply}</p>{tutorMode === "demo" && <p className="chat-small">Starter response · connect an AI key for open-ended tutoring.</p>}</div></div>}{tutorError && <div className="tutor-error">{tutorError}</div>}{tutorNote && <div className="chat-small tutor-note">{tutorNote}</div>}</div><div className="suggestion-chips"><button onClick={() => setSuggestedQuestion("Explain integers and negative numbers with an example")}>Explain integers</button><button onClick={() => setSuggestedQuestion("Help me understand indices and powers")}>Indices & powers</button><button onClick={() => setSuggestedQuestion("Teach me trigonometry step by step")}>Trigonometry</button></div><form className="tutor-input-row" onSubmit={askTutor}><input value={tutorQuestion} onChange={(e) => setTutorQuestion(e.target.value)} placeholder="Ask a maths question..." aria-label="Ask a maths question" /><button type="submit" className="send-button" aria-label="Send question" disabled={tutorLoading || !tutorQuestion.trim()}><ArrowRight size={19} /></button></form><p className="tutor-disclaimer"><ShieldCheck size={13} /> Your secret API key stays on the server, not in browser code.</p></section></div>}
    </main>
  );
}
