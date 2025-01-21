import { z } from "zod"

export const ItemResponseSchema = z.object({
    id: z.string(),
    name: z.string()
})

export const ItemArrayResponseSchema = z.array(
    ItemResponseSchema
)

export const ItemNameRequestSchema = z.object({
    name: z.string()
})

export const ItemIdRequestSchema = z.object({
    id: z.string(),
})
