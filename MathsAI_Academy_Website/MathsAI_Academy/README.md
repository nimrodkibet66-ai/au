# MathsAI Academy

A responsive Grade 9 mathematics website starter for the Kenya CBC learning pathway. It uses original example text and practice questions while following the broad topic structure visible in the Grade 9 Mathematics listing.

## Included in this project

- Responsive homepage with custom CSS illustration
- 20 searchable and filterable curriculum topics
- Topic preview modals with learning steps and a sample formula
- Practice questions with hints, feedback and worked explanations
- A tutor chat panel
- A server-side tutor API route
- Built-in demo answers if no AI key is configured
- Optional OpenAI-compatible Chat Completions request from the server
- Lightweight session-only progress tracking
- GitHub/Vercel deployment notes

## Run locally

Install Node.js 20.9 or newer first.

1. Extract the ZIP.
2. Open a terminal inside the `MathsAI_Academy` folder.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:3000.

Test a production build:

```bash
npm run build
npm run start
```

## Upload to GitHub

Create a new repository on GitHub. In this extracted project folder, run:

```bash
git init
git add .
git commit -m "Build MathsAI Academy website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mathsai-academy.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and use your actual repository URL. Do not commit `.env.local` or API keys.

## Publish it

GitHub stores the code, but does not run a Next.js website by itself. To put it online, import the repository into Vercel or another Next.js hosting provider. The build command is `npm run build`; the start command is `npm run start`.

## Enable open-ended AI tutoring (optional)

The tutor API route is at `app/api/tutor/route.ts`. Without an API key, it returns built-in sample explanations. To connect an AI provider:

1. Create a local `.env.local` file in the project root.
2. Add `OPENAI_API_KEY=your_real_key_here`.
3. Restart the development server.

Keep the key private. Never add it to client-side code, never prefix it with `NEXT_PUBLIC_`, and never upload `.env.local` to GitHub. On Vercel, add `OPENAI_API_KEY` in the project's Environment Variables settings, then redeploy.

This starter uses the Chat Completions endpoint and `gpt-4o-mini`. Model availability and pricing can change, so confirm the current model name in your AI provider dashboard. Add provider spending limits and rate limiting before opening the app to the public.

## Current limitations

- Tutor responses without an API key are demo responses, not a full AI model.
- Progress is held in browser memory and resets on refresh.
- There are no user accounts or database yet.
- Topic previews are a learning framework, not a complete textbook or complete set of lessons.
- Practice questions are a small starter set and need expansion and teacher review.
- It has not been independently tested against every device or browser.

## Responsible content

The topics are based on the Grade 9 Mathematics chapter headings identified from the Kenya Literature Bureau / Opiq listing. This project does not copy that book's full lesson text, images, or exercise bank. Write original teaching content and verify it with trusted curriculum sources before publishing.
