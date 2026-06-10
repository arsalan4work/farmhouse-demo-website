<!--
  Sync Impact Report
  ==================
  Version change: initial → 1.0.0
  Modified principles: N/A (initial version)
  Added sections:
    - Code Quality (TypeScript strict, functional components, naming conventions)
    - TDD Rules (Vitest + React Testing Library, test-first discipline)
    - Privacy & Legal (no client-side PII, WhatsApp/Maps guidelines, privacy policy)
  Removed sections: N/A
  Templates requiring updates:
    - plan-template.md: ✅ Constitution Check section aligns with new principles
    - spec-template.md: ✅ Requirements section accommodates privacy/technical constraints
    - tasks-template.md: ✅ Test-first discipline maps to TDD requirements
  Follow-up TODOs: None
-->

# Farmhouse Website Constitution

## Core Principles

### I. Code Quality

**TypeScript Strict Mode**
- All code MUST use `strict: true` in tsconfig.json
- No `any` types without explicit justification and documentation
- Strict equality (`===`) required, no implicit type coercion

**Functional Components Only**
- All React components MUST be functional (no class components)
- Hooks used for all state and side effects
- Components follow single responsibility principle

**Naming Conventions**
- Components and types: PascalCase (e.g., `FarmhouseHero`, `ContactForm`)
- Variables and functions: camelCase (e.g., `formData`, `handleSubmit`)
- Constants: UPPER_SNAKE_CASE (e.g., `WHATSAPP_COUNTRY_CODE`)
- Magic strings and numbers MUST be extracted to `constants.ts`

**Single Responsibility**
- Each component/function MUST have one clear purpose
- Large components MUST be split into smaller, composable units
- Helper functions extracted when reused or when complexity exceeds 20 lines

**Rationale**: Consistent code quality reduces cognitive load, enables faster onboarding, and reduces bugs from ambiguous patterns.

### II. Test-First Development (NON-NEGOTIABLE)

**TDD Mandate**
- Tests MUST be written before feature implementation
- Tests MUST fail initially (red phase) before implementation (green phase)
- Refactoring (refactor phase) only after passing tests

**Test File Organization**
- Test files colocated: `component.test.tsx` beside `component.tsx`
- Test structure mirrors source structure
- Test files named identically with `.test` suffix

**Test Coverage Requirements**
- Happy path coverage for all public APIs
- Edge case handling (empty states, invalid inputs, boundary conditions)
- Null/undefined safety for all asynchronous operations

**Testing Stack**
- Vitest as primary test runner
- React Testing Library for component testing
- No component shipped without passing tests

**Rationale**: Test-first development catches bugs early, enables confident refactoring, and serves as living documentation. The non-negotiable status ensures quality is non-negotiable.

### III. Privacy & Legal Compliance

**No Client-Side PII Storage**
- NO localStorage or sessionStorage for personally identifiable information
- NO cookies for user data persistence
- All user data processing MUST occur server-side or with explicit consent

**Communication Links**
- WhatsApp links MUST use only phone number + pre-filled text, no tracking parameters
- Google Maps embeds MUST use iframe-only approach (no Maps JS API key exposure)
- External links opened with `rel="noopener noreferrer"` when using `target="_blank"`

**Legal Pages**
- Privacy Policy page REQUIRED at `/privacy` route
- Cookie consent banner required only if analytics are added later
- Terms of Service page required if user accounts or transactions involved

**Data Handling**
- Pre-filled form data cleared after submission
- No third-party analytics added without privacy review
- Error messages MUST NOT expose sensitive system details

**Rationale**: Privacy by design protects users and the business from legal liability and reputational damage. Farmhouse website handles guest inquiries and must demonstrate responsible data stewardship.

### IV. Git & Commit Discipline

**Commit Format**
- Format: `feat|fix|chore: short description`
- `feat`: New features (minors)
- `fix`: Bug fixes (patches)
- `chore`: Maintenance tasks (documentation, config, deps)

**Feature Scope**
- ONE feature per commit (atomic changes)
- Multiple commits allowed within a feature branch
- Breaking changes flagged in commit message body

**Branch Naming**
- Feature branches: `[###-feature-name]` format
- Issue reference optional for small changes
- Consistent naming enables automated tooling

**Rationale**: Clean commit history enables rapid debugging, reliable rollbacks, and clear audit trail of project evolution.

## Governance

**Constitution Authority**
- This constitution supersedes all other development practices for this project
- All feature specifications MUST pass constitution review before implementation
- Violations require explicit justification in plan.md Complexity Tracking table

**Amendment Process**
- Propose change via GitHub issue or pull request
- Constitution changes require explicit version bump
- Breaking changes (MAJOR version) require team review and migration plan
- All amendments must update this file with date and version

**Versioning Policy**
- MAJOR: Backward-incompatible principle removals or redefinitions
- MINOR: New principles added or existing principles expanded
- PATCH: Clarifications, wording improvements, non-semantic fixes

**Compliance Review**
- All PRs MUST verify constitution compliance
- Code review checklist includes: strict mode, test coverage, naming conventions
- Privacy review required for any data-related feature
- Automated checks (ESLint, TypeScript) enforce technical constraints

**Version**: 1.0.0 | **Ratified**: 2026-06-10 | **Last Amended**: 2026-06-10
