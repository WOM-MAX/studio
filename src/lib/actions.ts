"use server";

import { suggestTagsAndTitles } from "@/ai/flows/suggest-tags-and-titles";
import { templates } from "@/lib/templates";
import { z } from "zod";

const processNoteSchema = z.object({
  note: z.string().min(10, "Note must be at least 10 characters long."),
  templateId: z.string(),
  useAi: z.boolean(),
});

export type FormState = {
  message: string;
  title?: string;
  tags?: string[];
  finalContent?: string;
  error?: boolean;
};

export async function processNote(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const useAi = formData.get("useAi") === "true";
    
    const parsed = processNoteSchema.safeParse({
      note: formData.get("note"),
      templateId: formData.get("templateId"),
      useAi: useAi,
    });

    if (!parsed.success) {
      return { message: parsed.error.errors[0].message, error: true };
    }
    
    const { note, templateId } = parsed.data;
    const template = templates.find((t) => t.id === templateId);

    if (!template) {
      return { message: "Invalid template selected.", error: true };
    }

    let title = "Untitled Note";
    let tags: string[] = [];

    if (useAi) {
      const suggestions = await suggestTagsAndTitles({ noteContent: note });
      title = suggestions.title;
      tags = suggestions.tags;
    }

    let finalContent = template.content;
    finalContent = finalContent.replace("{{title}}", title);
    finalContent = finalContent.replace("{{note}}", note);
    finalContent = finalContent.replace("{{tags}}", tags.join(", "));

    return {
      message: "Note processed successfully!",
      title,
      tags,
      finalContent,
    };
  } catch (e) {
    console.error(e);
    return { message: "An unexpected error occurred.", error: true };
  }
}
