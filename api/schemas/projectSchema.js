import { z } from 'zod'
import filter from 'leo-profanity'

filter.loadDictionary('en')

export const createProjectSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  })
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long")
    .refine(val => filter.check(val) === false, {
      message: "Inappropriate language or spam detected in title",
    }),

  description: z.string({
    required_error: "Description is required",
  })
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long")
    .refine(val => filter.check(val) === false, {
      message: "Inappropriate language or spam detected in description",
    }),

  status: z.enum(['todo', 'in-progress', 'completed'], {
    errorMap: () => ({ message: "Invalid status value" })
  }).optional(),

  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
