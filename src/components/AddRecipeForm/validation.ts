import * as Yup from "yup";

export const addRecipeValidationSchema = Yup.object({
  img: Yup.mixed<File>()
    .required("Image is required")
    .test("fileRequired", "Image is required", (value) => value instanceof File),

  name: Yup.string().trim().required("Recipe name is required"),

  description: Yup.string()
    .trim()
    .max(200, "Max 200 characters")
    .required("Description is required"),

  categoryId: Yup.string().required("Category is required"),

  areaId: Yup.string().required("Area is required"),

  time: Yup.number()
    .typeError("Cooking time is required")
    .min(1, "Minimum 1 minute")
    .required(),

  ingredients: Yup.array().of(Yup.string()).min(1, "Add at least one ingredient"),

  instructions: Yup.string()
    .trim()
    .max(1000, "Max 1000 characters")
    .required("Instructions are required"),
});