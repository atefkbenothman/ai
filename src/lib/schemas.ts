import { z } from "zod"

/* Code Snippets Schema */
export const codeSnippetSchema = z.object({
  snippets: z.array(
    z.object({
      language: z
        .string()
        .describe("programming language the code was written in"),
      snippet: z.string().describe("code snippet"),
      summary: z.string().describe("summary of the code"),
    }),
  ),
})

export type CodeSnippetSchema = z.infer<typeof codeSnippetSchema>

/* Github Pull Request Schema */
export const ghPullRequestSchema = z.object({
  title: z.string().describe("descriptive title of the changes"),
  body: z
    .string()
    .describe(
      "detailed description of all modifications, including: what changes were made and why, which files were modified, any important implementation details, how to test the changes",
    ),
  files: z.array(
    z.object({
      path: z.string().describe("full path of the file"),
      code: z
        .string()
        .describe("complete file content with changes - NEVER truncate"),
    }),
  ),
})

export type GHPullRequestSchema = z.infer<typeof ghPullRequestSchema>
