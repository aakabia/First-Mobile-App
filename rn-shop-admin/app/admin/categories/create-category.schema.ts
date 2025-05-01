import { z } from "zod";

export const createCategorySchema = z.object({
  image: z.any().refine((file) => file.length === 1, "Image is required "),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long! " }),
});

// this schema helps build our form by adding a schema for our expected category 
// our category is going to have a image and a name 
// when user, which is of type admin, is creating a category we ask for these two for valadation before creating a new category


export type CreateCategorySchema  = z.infer<typeof createCategorySchema>

// Above we export the type of our schema