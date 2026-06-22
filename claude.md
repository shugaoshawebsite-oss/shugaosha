# Project Constitution & Map

## 1. Project Overview
*This section will be populated once the North Star and project requirements are defined.*

- **Status**: Initialization Phase
- **Current Objective**: Establish project memory and gather Discovery answers.

## 2. Behavioral Rules
- Follow the B.L.A.S.T. protocol strictly.
- Prioritize reliability over speed.
- Never guess at business logic.
- Follow the Data-First Rule: Define schemas in `gemini.md` before coding.

## 3. Architectural Invariants
- 3-Layer Build structure:
  - Layer 1: `architecture/` - SOPs (Markdown)
  - Layer 2: Navigation - Orchestration layer (Agent reasoning)
  - Layer 3: `tools/` - Deterministic Python scripts (Atomic, testable)
- All temporary workbench files must reside in `.tmp/`.
- Credentials must reside in `.env`.
