import { useState, ChangeEvent } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import { addRecipeValidationSchema } from "./validation";
import { AddRecipeFormValues, IngredientUI } from "./types";

import styles from "./AddRecipeForm.module.scss";
import api from "../../api/client";
import { useEffect } from "react";
import type { SelectOption } from "../../components/AddRecipeForm/types";


const initialValues: AddRecipeFormValues = {
    name: "",
    description: "",
    categoryId: "",
    areaId: "",
    time: 1,
    instructions: "",
    ingredients: [],
    img: null,
}

  const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredientsUI, setIngredientsUI] = useState<IngredientUI[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [areas, setAreas] = useState<SelectOption[]>([]);
  const [ingredientsOptions, setIngredientsOptions] = useState<{ id: string; name: string }[]>([]);


  const formik = useFormik({
    initialValues,
    validationSchema: addRecipeValidationSchema,
    onSubmit: async values => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("instructions", values.instructions);
        formData.append("time", String(values.time));
        formData.append("categoryId", values.categoryId);
        formData.append("areaId", values.areaId);

        if (values.img) {
          formData.append("img", values.img);
        }

        values.ingredients.forEach(id =>
          formData.append("ingredients", id)
        );

        const res = await api.post("/recipes", formData);
        navigate(`/recipe/${res.data.id}`);
      } catch {
        iziToast.error({
          title: "Error",
          message: "Failed to create recipe",
        });
      }
    },
  });

  useEffect(() => {
  const loadData = async () => {
    try {
      const [catRes, areaRes, ingRes] = await Promise.all([
        api.get("/categories"),
        api.get("/areas"),
        api.get("/ingredients"),
      ]);

      setCategories(
        catRes.data.map((c: any) => ({
          value: c.id,
          label: c.name,
        }))
      );

      setAreas(
        areaRes.data.map((a: any) => ({
          value: a.id,
          label: a.name,
        }))
      );

      setIngredientsOptions(ingRes.data);
    } catch (e) {
      iziToast.error({
        title: "Error",
        message: "Failed to load form data",
      });
    }
  };

  loadData();
}, []);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    formik.setFieldValue("img", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddIngredient = () => {
    if (!selectedIngredient || !ingredientQuantity) return;

    const ingredient = ingredientsOptions.find(
      ing => ing.id === selectedIngredient
    );
    if (!ingredient) return;

    if (formik.values.ingredients.includes(ingredient.id)) {
    iziToast.warning({
      title: "Already added",
      message: "This ingredient is already in the recipe",
    });
    return;
  }

    

    setIngredientsUI(prev => [
      ...prev,
      {
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredientQuantity,
      },
    ]);

    formik.setFieldValue("ingredients", [
      ...formik.values.ingredients,
      ingredient.id,
    ]);

    setSelectedIngredient("");
    setIngredientQuantity("");
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredientsUI(prev => prev.filter(i => i.id !== id));
    formik.setFieldValue(
      "ingredients",
      formik.values.ingredients.filter(i => i !== id)
    );
  };

  const handleClear = () => {
    formik.resetForm();
    setIngredientsUI([]);
    setImagePreview(null);
  };
  


  return (
    
    <form onSubmit={formik.handleSubmit} className={styles.form}>

      {/* IMAGE */}
      <div className={styles.image}>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* NAME */}
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />

      {/* DESCRIPTION */}
      <TextArea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        maxLength={200}
        error={Boolean(formik.touched.description && formik.errors.description)}

      />

      {/* CATEGORY / AREA */}
      <Select
        name="categoryId"
        value={formik.values.categoryId}
        onChange={formik.handleChange}
        options={categories}
        error={formik.touched.categoryId ? formik.errors.categoryId : undefined}
      />

      <Select
        name="areaId"
        value={formik.values.areaId}
        onChange={formik.handleChange}
        options={areas}
        error={formik.touched.areaId ? formik.errors.areaId : undefined}
      />

      {/* COOKING TIME */}
  <div className={styles.time}>
  <label className={styles.timeLabel}>Cooking time</label>

  <div className={styles.timeControls}>
    <button
      type="button"
      className={styles.timeBtn}
      onClick={() =>
        formik.setFieldValue(
          "time",
          Math.max(1, formik.values.time - 1)
        )
      }
      aria-label="Decrease cooking time"
    >
      -
    </button>

    <span className={styles.timeValue}>
      {formik.values.time} min
    </span>

    <button
      type="button"
      className={styles.timeBtn}
      onClick={() =>
        formik.setFieldValue("time", formik.values.time + 1)
      }
      aria-label="Increase cooking time"
    >
      +
    </button>
  </div>

  {formik.touched.time && formik.errors.time && (
    <div className={styles.error}>{formik.errors.time}</div>
  )}
</div>

      {/* INGREDIENTS */}
      <div className={styles.ingredients}>
        <Select
  value={selectedIngredient}
  onChange={e => setSelectedIngredient(e.target.value)}
  options={ingredientsOptions.map(i => ({
    value: i.id,
    label: i.name,
  }))}
/>


        <input
          value={ingredientQuantity}
          onChange={e => setIngredientQuantity(e.target.value)}
          placeholder="Quantity"
        />

        <Button type="button" onClick={handleAddIngredient}>
          Add ingredient +
        </Button>

        {ingredientsUI.map(i => (
          <div key={i.id} className={styles.ingredient}>
            <span>{i.name}</span>
            <span>{i.quantity}</span>
            <Button type="button" onClick={() => handleRemoveIngredient(i.id)}>
              ✕
            </Button>
          </div>
        ))}
      </div>

      {/* INSTRUCTIONS */}
      <TextArea
        name="instructions"
        value={formik.values.instructions}
        onChange={formik.handleChange}
        maxLength={1000}
        error={Boolean(formik.touched.instructions && formik.errors.instructions)}

      />

      {/* ACTIONS */}
      <div className={styles.actions}>
        <Button type="button" variant="outlined-dark" onClick={handleClear}>
          🗑
        </Button>
        <Button type="submit" variant="dark">
          Publish
        </Button>
      </div>

    </form>
  );
};

export default AddRecipeForm;
