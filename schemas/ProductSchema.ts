export const ProductSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    price: { type: "number" },
    category: { type: "string" },
  },
  required: ["id", "title", "price", "category"],
};
