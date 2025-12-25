"use server";

import { suggestTagsAndTitles } from "@/ai/flows/suggest-tags-and-titles";
import { templates } from "@/lib/templates";
import { z } from "zod";

const processNoteSchema = z.object({
  note: z.string().min(10, "La nota debe tener al menos 10 caracteres."),
  templateId: z.string(),
  useAi: z.boolean(),
  templateName: z.string().optional(),
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
      templateName: formData.get("templateName"),
    });

    if (!parsed.success) {
      return { message: parsed.error.errors[0].message, error: true };
    }
    
    const { note, templateId, templateName } = parsed.data;
    
    let template;

    if (templateId === 'custom') {
        template = {
            id: "custom",
            name: templateName || "Nota Personalizada",
            description: "Una plantilla de nota personalizada.",
            content: `---
tags: [{{tags}}]
title: "{{title}}"
---

# {{title}}

`,
        };
    } else {
        template = templates.find((t) => t.id === templateId);
    }


    if (!template) {
      return { message: "Plantilla inválida seleccionada.", error: true };
    }

    let title = "Nota sin título";
    let tags: string[] = [];
    
    if (templateId === 'custom' && templateName) {
        tags.push(templateName.toLowerCase().replace(/\s+/g, '-'));
    }

    if (useAi) {
      const suggestions = await suggestTagsAndTitles({ noteContent: note });
      title = suggestions.title;
      // Combine AI tags with custom template tag if present
      tags = [...new Set([...tags, ...suggestions.tags])];
    }

    let finalContent = template.content;
    finalContent = finalContent.replace("{{title}}", title);
    finalContent = finalContent.replace("{{note}}", note);
    finalContent = finalContent.replace("{{tags}}", tags.join(", "));

    return {
      message: "¡Nota procesada con éxito!",
      title,
      tags,
      finalContent,
    };
  } catch (e) {
    console.error(e);
    return { message: "Ocurrió un error inesperado.", error: true };
  }
}
