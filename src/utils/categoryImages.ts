/**
 * Маппінг назв категорій до URL зображень
 * Поки що використовуємо placeholder зображення або публічні URL
 * Пізніше можна додати реальні зображення в assets
 */

const categoryImageMap: Record<string, string> = {
  Beef: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
  Breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop",
  Chicken: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
  Dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
  Desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
  Goat: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=400&fit=crop",
  Lamb: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
  Miscellaneous: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
  Pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
  Pork: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
  Seafood: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop",
  Side: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
  Starter: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
  Soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop",
  Vegan: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
  Vegetarian: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
};

/**
 * Отримує URL зображення для категорії за її назвою
 * @param categoryName - Назва категорії
 * @returns URL зображення або undefined якщо не знайдено
 */
export const getCategoryImageUrl = (categoryName: string): string | undefined => {
  return categoryImageMap[categoryName];
};
