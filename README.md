# Quantum Identity - Portfolio Modification Guide

This is your master guide for modifying the "Quantum Identity" portfolio.

## 1. How to Upload Your Profile Picture
Currently, the portfolio shows a fallback "KM" logo. To add your real photo:
1. Find a square, professional photo of yourself (e.g., from your LinkedIn).
2. Rename the picture file to exactly **`profile.jpg`**
3. Drag and drop your **`profile.jpg`** file into the `public/images/` folder in this project.
*(If you use a `.png`, you will just need to open `components/HeroSection.tsx` and `components/AboutSection.tsx` and change `src="/images/profile.jpg"` to `src="/images/profile.png"`).*

---

## 2. Your "Modification Prompt"
If you ever want an AI (like Gemini, ChatGPT, Claude) to add new projects, change colors, or update your experience without messing up the 3D effects, you can copy and paste this exact prompt into the AI:

> "I need to update my 'Quantum Identity' portfolio (Next.js, Tailwind, React Three Fiber, Framer Motion). 
> 
> Please follow these strict rules to maintain the 'Glassmorphism 2.0' & Military-grade Tech aesthetic:
> 1. **Do not touch `layout.tsx`, `NeuralNetworkBG.tsx`, or `globals.css` unless specifically asked.** The 3D background and Z-index architecture must remain exactly as is.
> 2. Keep the color scheme locked to Amber (`#FF6B35`) and Cyan (`#0096FF`) with dark/glass backgrounds (`bg-white/5`, `bg-black/40`). Keep using the font constants `font-heading` (Syncopate) and `font-mono` (Space Grotesk).
> 
> **Here is what I need you to update today:**
> *(Insert your changes here. Example: 'Add a new Data Scientist role at Microsoft to the Journey section and add a new AI Project to the Projects Section.')*
>
> Please edit the necessary TSX files (e.g., `JourneySection.tsx` or `ProjectsSection.tsx`) and provide the updated code."

---

## 3. Which Files Control Which Sections?
If you ever want to change the text manually yourself, here is your cheat sheet:
*   **Splash Screen Text**: `components/SentientSplashScreen.tsx` *(Lines starting with `const bootSequence = [`)*
*   **Hero (Name, Roles, 3D Rings)**: `components/HeroSection.tsx` 
*   **About Me (Bio, Location, Clearance)**: `components/AboutSection.tsx`
*   **Skills Grid**: `components/SkillsSection.tsx`
*   **Projects**: `components/ProjectsSection.tsx`
*   **Experience & Certifications**: `components/JourneySection.tsx`
*   **Contact Form & Social Links**: `components/ContactFooterSection.tsx`