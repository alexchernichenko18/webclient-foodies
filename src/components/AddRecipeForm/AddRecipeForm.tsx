import { useEffect, useState, type ChangeEvent } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Input from "../ui/Input";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { addRecipeValidationSchema } from "./validation";
import { type AddRecipeFormValues, type IngredientUI } from "./types";
import { ReactComponent as IconTrash } from "../../assets/icons/icon-trash.svg";

import styles from "./AddRecipeForm.module.scss";
import api from "../../api/client";
import type { SelectOption } from "../../components/AddRecipeForm/types";
import classNames from "classnames";
import { createRecipe } from "../../api/recipes";

type IngredientOption = {
  id: string;
  name: string;
  img?: string;
};

const initialValues: AddRecipeFormValues = {
  name: "",
  description: "",
  categoryId: "",
  areaId: "",
  time: 1,
  instructions: "",
  ingredients: [],
  img: null,
};

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredientsUI, setIngredientsUI] = useState<IngredientUI[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [areas, setAreas] = useState<SelectOption[]>([]);
  const [ingredientsOptions, setIngredientsOptions] = useState<IngredientOption[]>([]);

  const formik = useFormik<AddRecipeFormValues>({
    initialValues,
    validationSchema: addRecipeValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const created = await createRecipe({
          name: values.name,
          description: values.description,
          instructions: values.instructions,
          time: values.time,
          categoryId: values.categoryId,
          areaId: values.areaId,
          ingredientIds: values.ingredients,
          img: values.img,
        });
        navigate(`/recipe/${created.id}`);
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

        const ingredientsData = ingRes.data.filter((i: any) => Boolean(i.description));
        setIngredientsOptions(
          ingredientsData.map((i: any) => ({
            id: i.id,
            name: i.name,
            img: i.img,
          }))
        );
      } catch {
        iziToast.error({
          title: "Error",
          message: "Failed to load form data",
        });
      }
    };

    void loadData();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    formik.setFieldValue("img", file);
    formik.setFieldTouched("img", false, false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddIngredient = () => {
    if (!selectedIngredient || !ingredientQuantity) return;

    const ingredient = ingredientsOptions.find((ing) => ing.id === selectedIngredient);
    if (!ingredient) return;

    if (formik.values.ingredients.includes(ingredient.id)) {
      iziToast.warning({
        title: "Already added",
        message: "This ingredient is already in the recipe",
      });
      return;
    }

    setIngredientsUI((prev) => [
      ...prev,
      {
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredientQuantity,
        img: ingredient.img,
      },
    ]);

    formik.setFieldValue("ingredients", [...formik.values.ingredients, ingredient.id]);
    formik.setFieldTouched("ingredients", false, false);

    setSelectedIngredient("");
    setIngredientQuantity("");
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredientsUI((prev) => prev.filter((i) => i.id !== id));
    formik.setFieldValue(
      "ingredients",
      formik.values.ingredients.filter((i) => i !== id)
    );
    formik.setFieldTouched("ingredients", false, false);
  };

  const handleClear = () => {
    formik.resetForm();
    setIngredientsUI([]);
    setImagePreview(null);
    setSelectedIngredient("");
    setIngredientQuantity("");
  };

  const showError = (field: keyof AddRecipeFormValues) =>
    Boolean(formik.touched[field] && formik.errors[field]);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
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
                    <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
                <span className={styles.uploadCta}>Upload a photo</span>
              </div>
            )}

            <input
              id="recipeImage"
              name="img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              onBlur={() => formik.setFieldTouched("img", true, true)}
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

          {showError("img") && <p className={styles.fieldError}>{formik.errors.img as string}</p>}
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>ADD RECIPE</h1>

        <Input
          name="name"
          value={formik.values.name}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched("name", false, false);
          }}
          // @ts-ignore
          onBlur={formik.handleBlur}
          placeholder="Enter recipe name"
          className={classNames(styles.nameInput, showError("name") && styles.inputError)}
        />
        {showError("name") && <p className={styles.fieldError}>{formik.errors.name}</p>}

        <div className={styles.field}>
          <TextArea
            name="description"
            value={formik.values.description}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldTouched("description", false, false);
            }}
            onBlur={formik.handleBlur}
            maxLength={200}
            placeholder="Enter a description of the dish"
            className={classNames(styles.textareaLine, showError("description") && styles.inputError)}
          />
          {showError("description") && <p className={styles.fieldError}>{formik.errors.description}</p>}
        </div>

        <div className={styles.row}>
          <div className={classNames(styles.field, styles.w50)}>
            <p className={styles.label}>CATEGORY</p>
            <Select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={(e) => {
                formik.setFieldValue("categoryId", e.target.value);
                formik.setFieldTouched("categoryId", false, false);
              }}
              onBlur={() => formik.setFieldTouched("categoryId", true, true)}
              options={categories}
              placeholder="Select a category"
              error={showError("categoryId") ? (formik.errors.categoryId as string) : undefined}
              className={styles.selectPill}
            />
          </div>

          <div className={classNames(styles.field, styles.w50)}>
            <p className={styles.label}>COOKING TIME</p>
            <div className={styles.timePill}>
              <button
                type="button"
                className={styles.timeBtn}
                onClick={() => {
                  formik.setFieldValue("time", Math.max(0, formik.values.time - 5));
                  formik.setFieldTouched("time", false, false);
                }}
              >
                -
              </button>

              <span className={styles.timeValue}>{formik.values.time} min</span>

              <button
                type="button"
                className={styles.timeBtn}
                onClick={() => {
                  formik.setFieldValue("time", formik.values.time + 5);
                  formik.setFieldTouched("time", false, false);
                }}
              >
                +
              </button>
            </div>
            {showError("time") && <p className={styles.fieldError}>{formik.errors.time as string}</p>}
          </div>
        </div>

        <div className={classNames(styles.field, styles.w50)}>
          <p className={styles.label}>AREA</p>
          <Select
            name="areaId"
            value={formik.values.areaId}
            onChange={(e) => {
              formik.setFieldValue("areaId", e.target.value);
              formik.setFieldTouched("areaId", false, false);
            }}
            onBlur={() => formik.setFieldTouched("areaId", true, true)}
            options={areas}
            placeholder="Area"
            error={showError("areaId") ? (formik.errors.areaId as string) : undefined}
            className={styles.selectPill}
          />
        </div>

        <div className={styles.field}>
  <p className={styles.label}>INGREDIENTS</p>

  <div className={styles.ingredientsRow}>
    <Select
      value={selectedIngredient}
      onChange={(e) => setSelectedIngredient(e.target.value)}
      options={ingredientsOptions.map((i) => ({ value: i.id, label: i.name }))}
      placeholder="Add the ingredient"
      className={styles.selectPill}
    />

    <input
      value={ingredientQuantity}
      onChange={(e) => setIngredientQuantity(e.target.value)}
      placeholder="Enter quantity"
      className={styles.inputLine}
    />
  </div>

  <Button
    type="button"
    variant="outlined-light"
    onClick={handleAddIngredient}
    className={styles.addIngredientBtn}
  >
    ADD INGREDIENT +
  </Button>

  {showError("ingredients") && <p className={styles.fieldError}>{formik.errors.ingredients as string}</p>}

  {!!ingredientsUI.length && (
    <div className={styles.ingredientsList}>
      {ingredientsUI.map((i) => (
        <div key={i.id} className={styles.ingredientChip}>
          {i.img && <img src={i.img} alt={i.name} className={styles.ingredientImg} />}
          <div className={styles.ingredientMeta}>
            <button
              type="button"
              className={styles.removeChip}
              onClick={() => handleRemoveIngredient(i.id)}
            >
              ✕
            </button>
            <span className={styles.ingredientName}>{i.name}</span>
            <span className={styles.ingredientQty}>{i.quantity}</span>
          </div>
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
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldTouched("instructions", false, false);
            }}
            onBlur={formik.handleBlur}
            maxLength={1000}
            placeholder="Enter recipe"
            className={classNames(styles.textareaLine, showError("instructions") && styles.inputError)}
          />
          {showError("instructions") && <p className={styles.fieldError}>{formik.errors.instructions}</p>}
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="light"
            onClick={handleClear}
            icon={<IconTrash />}
            className={styles.trashBtn}
            size="large"
          />
          <Button type="submit" variant="dark" className={styles.publishBtn}>
            PUBLISH
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
