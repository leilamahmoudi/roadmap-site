# Claude Code Workflow

A structured four-phase workflow for building software products with Claude Code. Each phase produces a document that the next phase builds on.

## How to Use

Copy the `.claude/commands/` folder into your project root:

```bash
cp -r .claude/commands/ your-project/.claude/commands/
```

Then open your project in Claude Code and run the phases in order.

## The Phases

### `/phase1` — Define and Spec

Runs an interview to define your project. Produces `project-owner-expectations.md`.

Claude will ask one question at a time about your project goal, users, core features, constraints, and what is out of scope. Answer briefly. Claude will ask follow-up questions if anything is unclear.

### `/phase2` — Assign Roles

Reads `project-owner-expectations.md` and defines the specialist roles relevant to your project — such as product, UX, architecture, or security.

These roles create concrete quality criteria and constraints for the next phases. They are specific to your project, not a fixed list.

### `/phase3` — Plan the Architecture and Tech Stack

Guides you through the important technical decisions one at a time. Produces two documents:

- `build-plan.md` — the agreed architecture, tech stack, and key decisions
- `task-list.md` — the implementation broken into small, ordered, actionable tasks

### `/phase4` — Implement

Reads `build-plan.md` and `task-list.md` and works through the tasks in order. One task at a time, verified before moving on.

## Requirements

- [Claude Code](https://claude.ai/code)
