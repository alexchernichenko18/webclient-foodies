import * as Yup from "yup";

export const addRecipeValidationSchema = Yup.object({
  img: Yup.mixed().nullable(),

  name: Yup.string()
    .trim()
    .required("Recipe name is required"),

  description: Yup.string()
    .max(200, "Max 200 characters")
    .required("Description is required"),

  categoryId: Yup.string()
    .required("Category is required"),

  areaId: Yup.string()
    .required("Country is required"),

  time: Yup.number()
    .min(1, "Minimum 1 minute")
    .required("Cooking time is required"),

  ingredients: Yup.array()
    .of(Yup.string())
    .min(1, "Add at least one ingredient")
    .required(),

  instructions: Yup.string()
    .max(1000, "Max 1000 characters")
    .required("Instructions are required"),
});
