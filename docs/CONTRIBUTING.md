# Contributing to shugaosha

First off, thank you for considering contributing to `shugaosha`! 

## Branching Strategy

We use **GitHub Flow** for collaboration. This means:
1. The `main` branch is always stable and deployable.
2. All new work happens on feature or bugfix branches created from `main`.
3. Work is merged back into `main` via Pull Requests.

### Branch Naming Conventions
Please follow these conventions when creating branches:
- `feature/<feature-name>`: For new features or enhancements.
- `bugfix/<bug-name>`: For fixing a bug.
- `hotfix/<hotfix-name>`: For urgent fixes directly to production.
- `docs/<doc-update-name>`: For documentation updates.
- `refactor/<refactor-name>`: For code refactoring without changing behavior.

*Example: `feature/user-authentication`, `bugfix/header-alignment`*

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/). This leads to more readable messages that are easy to follow when looking through the project history.

Format:
`<type>[optional scope]: <description>`

Common types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

*Example: `feat(auth): add google sign-in provider`, `fix(ui): correct padding on mobile navbar`*

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create your branch and start working!
3. Before submitting your PR, ensure the build passes and no linting errors are introduced:
   ```bash
   npm run build
   npm run lint
   ```
