import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  city: z.string().min(1, "City is required"),
  price: z.number().int().positive("Price must be positive"),
  surface: z.number().int().positive("Surface must be positive"),
});

export const updateItemSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").optional(),
  city: z.string().min(1, "City cannot be empty").optional(),
  price: z.number().int().positive("Price must be positive").optional(),
  surface: z.number().int().positive("Surface must be positive").optional(),
});

export const itemIdParamSchema = z.object({
  id: z.string().uuid("Invalid item ID"),
});
