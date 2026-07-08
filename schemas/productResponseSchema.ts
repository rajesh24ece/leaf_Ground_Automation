import { ProductSchema } from "../schemas/ProductSchema";

export const ProductResponseSchema = {
  type: "object",

  properties: {
    products: {
      type: "array",
      items: ProductSchema,
    },

    total: {
      type: "integer",
    },

    skip: {
      type: "integer",
    },

    limit: {
      type: "integer",
    },
  },

  required: ["products", "total", "skip", "limit"],

  additionalProperties: true,
} as const;
