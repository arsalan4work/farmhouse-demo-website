---
id: 001
title: Constitution - Farmhouse Website
stage: constitution
date: 2026-06-10
surface: agent
model: claude-opus-4-8
feature: none
branch: master
user: Developer
command: sp.constitution
labels: ["constitution","code-quality","tdd","privacy","git"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - Constitution validation: No placeholder tokens remaining
---

## Prompt

```text
Farmhouse Website

## Code Quality
- TypeScript strict mode, yes 
- Functional components only, no class components
- Single responsibility per component/function
- Extract magic strings to constants.ts
- Consistent naming: PascalCase components, camelCase vars, UPPER_SNAKE constants

## TDD Rules
- Write test before feature for utils and hooks
- Test file colocated: `component.test.tsx` beside `component.tsx`
- Cover: happy path, edge case, null/empty state
- Use Vitest + React Testing Library
- No component ships without passing tests

## Privacy & Legal
- No user data stored client-side (no localStorage for PII)
- WhatsApp links use only phone + pre-filled text, no tracking params
- Google Maps embed only (no Maps JS API key exposed)
- Privacy Policy page required at /privacy
- Cookie consent banner if any analytics added later

## Git
- Commit format: `feat|fix|chore: short description`
- One feature per commit
```

## Response snapshot

Created the project constitution at `.specify/memory/constitution.md` with four core principles:

1. **Code Quality**: TypeScript strict mode, functional components only, naming conventions (PascalCase components, camelCase vars, UPPER_SNAKE constants), single responsibility, magic strings extracted to constants.ts

2. **Test-First Development (NON-NEGOTIABLE)**: TDD mandatory (tests before implementation, red-green-refactor cycle), colocated test files (`component.test.tsx`), coverage includes happy path/edge cases/null states, Vitest + React Testing Library stack, no component ships without passing tests

3. **Privacy & Legal Compliance**: No client-side PII storage (no localStorage for PII), WhatsApp links without tracking params, Google Maps iframe-only embeds, Privacy Policy at `/privacy`, cookie consent required only for analytics, no sensitive data in error messages

4. **Git & Commit Discipline**: Format `feat|fix|chore: description`, one feature per commit, branch naming `[###-feature-name]`

Version: 1.0.0 (initial ratification)
Last Amended: 2026-06-10

Templates reviewed for consistency:
- plan-template.md: Constitution Check section aligns
- spec-template.md: Requirements section accommodates constraints
- tasks-template.md: Test-first discipline maps to TDD requirements

## Outcome

- ✅ Impact: Establishes foundational development standards for Farmhouse Website project
- 🧪 Tests: Constitution validation passed - no placeholder tokens remaining
- 📁 Files: `.specify/memory/constitution.md` created
- 🔁 Next prompts: Use `/sp.plan` to create feature specifications against constitution
- 🧠 Reflection: Constitution follows "NON-NEGOTIABLE" pattern for TDD to ensure quality is non-optional

## Evaluation notes (flywheel)

- Failure modes observed: None - template placeholders successfully replaced
- Graders run and results: PASS - Validated no unexplained bracket tokens remain
- Prompt variant: N/A
- Next experiment: N/A
