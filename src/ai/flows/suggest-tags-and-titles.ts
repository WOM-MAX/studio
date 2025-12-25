'use server';
/**
 * @fileOverview An AI agent for suggesting tags and titles for notes.
 *
 * - suggestTagsAndTitles - A function that handles the tag and title suggestion process.
 * - SuggestTagsAndTitlesInput - The input type for the suggestTagsAndTitles function.
 * - SuggestTagsAndTitlesOutput - The return type for the suggestTagsAndTitles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsAndTitlesInputSchema = z.object({
  noteContent: z.string().describe('The content of the note to analyze.'),
});
export type SuggestTagsAndTitlesInput = z.infer<typeof SuggestTagsAndTitlesInputSchema>;

const SuggestTagsAndTitlesOutputSchema = z.object({
  title: z.string().describe('The suggested title for the note.'),
  tags: z.array(z.string()).describe('An array of suggested tags for the note.'),
});
export type SuggestTagsAndTitlesOutput = z.infer<typeof SuggestTagsAndTitlesOutputSchema>;

export async function suggestTagsAndTitles(input: SuggestTagsAndTitlesInput): Promise<SuggestTagsAndTitlesOutput> {
  return suggestTagsAndTitlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTagsAndTitlesPrompt',
  input: {schema: SuggestTagsAndTitlesInputSchema},
  output: {schema: SuggestTagsAndTitlesOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant tags and titles for notes.

  Analyze the note content provided and suggest a title and a list of tags that would help the user organize and retrieve the note later.

  Note Content: {{{noteContent}}}
  `,
});

const suggestTagsAndTitlesFlow = ai.defineFlow(
  {
    name: 'suggestTagsAndTitlesFlow',
    inputSchema: SuggestTagsAndTitlesInputSchema,
    outputSchema: SuggestTagsAndTitlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
