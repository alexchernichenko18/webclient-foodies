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
import { ReactComponent as IconTrash } from "../../assets/icons/icon-trash.svg";

import styles from "./AddRecipeForm.module.scss";
import api from "../../api/client";
import { useEffect } from "react";
import type { SelectOption } from "../../components/AddRecipeForm/types";
import classNames from "classnames";


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
      <div className={styles.left}>
        <div className={styles.imageSection}>
          <label className={styles.imageDropzone} htmlFor="recipeImage">
            {imagePreview ? (
              <img className={styles.imagePreview} src={imagePreview} alt="Recipe" />
            ) : (
              <div className={styles.imagePlaceholder}>
                <div className={styles.cameraIconWrap}>
                  <svg
                    className={styles.cameraIcon}
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 4.5h6l1.2 2H19a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 19 19.5H5A2.5 2.5 0 0 1 2.5 17V9A2.5 2.5 0 0 1 5 6.5h2.8L9 4.5Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </div>

                <span className={styles.uploadCta}>Upload a photo</span>
              </div>
            )}

            <input
              id="recipeImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>

          {imagePreview && (
            <button
              type="button"
              className={styles.uploadAnother}
              onClick={() => document.getElementById("recipeImage")?.click()}
            >
              Upload another photo
            </button>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>ADD RECIPE</h1>

        <div className={styles.field}>
          <p className={styles.label}>THE NAME OF THE RECIPE</p>

          <TextArea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            maxLength={200}
            placeholder="Enter a description of the dish"
            className={styles.textareaLine}
          />
        </div>

        <div className={styles.row}>
          <div className={classNames(styles.field, styles.w50)}>
            <p className={styles.label}>CATEGORY</p>
            <Select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              options={categories}
              placeholder="Select a category"
              className={styles.selectPill}
            />
          </div>

          <div className={classNames(styles.field, styles.w50)}>
            <p className={styles.label}>COOKING TIME</p>
            <div className={styles.timePill}>
              <button
                type="button"
                className={styles.timeBtn}
                onClick={() => formik.setFieldValue("time", Math.max(1, formik.values.time - 1))}
              >
                −
              </button>

              <span className={styles.timeValue}>{formik.values.time} min</span>

              <button
                type="button"
                className={styles.timeBtn}
                onClick={() => formik.setFieldValue("time", formik.values.time + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={classNames(styles.field, styles.w50)}>
          <p className={styles.label}>AREA</p>
          <Select
            name="areaId"
            value={formik.values.areaId}
            onChange={formik.handleChange}
            options={areas}
            placeholder="Area"
            className={styles.selectPill}
          />
        </div>

        <div className={styles.field}>
          <p className={styles.label}>INGREDIENTS</p>

          <div className={styles.ingredientsRow}>
            <Select
              value={selectedIngredient}
              onChange={e => setSelectedIngredient(e.target.value)}
              options={ingredientsOptions.map(i => ({ value: i.id, label: i.name }))}
              placeholder="Add the ingredient"
              className={styles.selectPill}
            />

            <input
              value={ingredientQuantity}
              onChange={e => setIngredientQuantity(e.target.value)}
              placeholder="Enter quantity"
              className={styles.inputLine}
            />
          </div>

          <Button type="button" variant="outlined-light" onClick={handleAddIngredient} className={styles.addIngredientBtn}>
            ADD INGREDIENT +
          </Button>

          {!!ingredientsUI.length && (
            <div className={styles.ingredientsList}>
              {ingredientsUI.map(i => (
                <div key={i.id} className={styles.ingredientChip}>
                  <span className={styles.ingredientName}>{i.name}</span>
                  <span className={styles.ingredientQty}>{i.quantity}</span>
                  <button type="button" className={styles.removeChip} onClick={() => handleRemoveIngredient(i.id)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <p className={styles.label}>RECIPE PREPARATION</p>
          <TextArea
            name="instructions"
            value={formik.values.instructions}
            onChange={formik.handleChange}
            maxLength={1000}
            placeholder="Enter recipe"
            className={styles.textareaLine}
          />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="light" onClick={handleClear} icon={<IconTrash />} className={styles.trashBtn} size="large">
          </Button>

          <Button type="submit" variant="dark" className={styles.publishBtn}>
            PUBLISH
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
