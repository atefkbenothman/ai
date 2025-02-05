import { z } from "zod"


/* Schemas */
export const codeSnippetSchema = z.object({
  snippets: z.array(
    z.object({
      language: z
        .string()
        .describe("programming language the code was written in")
        .optional(),
      snippet: z.string().describe("code snippet").optional(),
      summary: z.string().describe("summary of the code").optional(),
    }),
  ),
})


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


export type CodeSnippetSchema = z.infer<typeof codeSnippetSchema>
export type GHPullRequestSchema = z.infer<typeof ghPullRequestSchema>

export type ObjectSchemaType = "snippets" | "pull-request"

type ObjectSchema = {
  id: string
  name: string
  type: ObjectSchemaType
  description: string
  schema: z.ZodSchema
}

export const objectSchemas: Array<ObjectSchema> = [
  {
    id: "code-snippets",
    name: "code snippets",
    type: "snippets",
    description: "generate code snippets for a given topic",
    schema: codeSnippetSchema
  },
  {
    id: "pull-request",
    name: "pull request",
    type: "pull-request",
    description: "generate a pull request in a codebase",
    schema: ghPullRequestSchema
  },
]

export const DEFAULT_CHAT_SCHEMA: ObjectSchemaType = "snippets"