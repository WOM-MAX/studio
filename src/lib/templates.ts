export type NoteTemplate = {
  id: string;
  name: string;
  description: string;
  content: string;
  placeholder: string;
};

export const templates: NoteTemplate[] = [
  {
    id: "simple-note",
    name: "Simple Note",
    description: "A basic template for quick thoughts.",
    content: `---
tags: [{{tags}}]
title: "{{title}}"
---

# {{title}}

{{note}}
`,
    placeholder: "Just write your idea...",
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Structure your meeting minutes.",
    content: `---
tags: [meeting, {{tags}}]
title: "Meeting: {{title}}"
---

# Meeting: {{title}}

**Date:** ${new Date().toISOString().slice(0, 10)}
**Attendees:** 

## Agenda
- 

## Notes
{{note}}

## Action Items
- [ ] 
`,
    placeholder: "What was discussed in the meeting?",
  },
  {
    id: "daily-journal",
    name: "Daily Journal",
    description: "A template for your daily reflections.",
    content: `---
tags: [journal, daily, {{tags}}]
title: "Journal - ${new Date().toISOString().slice(0, 10)}"
---

# Journal - ${new Date().toISOString().slice(0, 10)}

## Highlights
{{note}}

## Gratitude
- 

## Mood
- 🙂
`,
    placeholder: "What were the highlights of your day?",
  },
];
