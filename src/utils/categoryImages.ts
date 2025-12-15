export interface CategoryCardImageSourceSet {
  src: string;
  srcSet: string;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  Beef: "beef",
  Breakfast: "breakfast",
  Chicken: "chicken",
  Dessert: "desserts",
  Desserts: "desserts",
  Goat: "goat",
  Lamb: "lamb",
  Miscellaneous: "miscellaneous",
  Pasta: "pasta",
  Pork: "pork",
  Seafood: "seafood",
  Side: "side",
  Starter: "starter",
  Soup: "soup",
  Vegan: "vegan",
  Vegetarian: "vegetarian",
};

export const getCategoryCardImage = (categoryName: string): CategoryCardImageSourceSet | undefined => {
  const slug = CATEGORY_SLUG_MAP[categoryName];
  if (!slug) return undefined;

  const src = `/images/category-${slug}.jpg`;
  const src2x = `/images/category-${slug}@2x.jpg`;

  return {
    src,
    srcSet: `${src} 1x, ${src2x} 2x`,
  };
};