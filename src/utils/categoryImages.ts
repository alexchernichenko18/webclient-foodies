/**
 * Маппінг назв категорій до зображень з підтримкою responsive images
 *
 * Структура:
 * - mobile/ - 340×340px для екранів до 768px
 * - tablet/ - 460×460px для екранів 768px-1439px
 * - desktop/ - 660×660px для екранів 1440px+
 */

// TODO: Після оптимізації зображень, додайте імпорти для кожної категорії та breakpoint
// Приклад:
// import beefMobile from "../../assets/images/categories/mobile/beef.webp";
// import beefTablet from "../../assets/images/categories/tablet/beef.webp";
// import beefDesktop from "../../assets/images/categories/desktop/beef.webp";

// Тип для responsive зображення
export interface ResponsiveImage {
  mobile: string;
  tablet: string;
  tabletLarge?: string; // Для великих карток на tablet (704×369)
  desktop: string;
  desktopLarge?: string; // Для великих карток на desktop (590×369)
}

// Маппінг назв категорій до responsive зображень
// TODO: Замініть URL на імпорти після додавання оптимізованих зображень
// Mobile: 343×250px
// Tablet small: 342×369px, Tablet large: 704×369px
// Desktop small: 325×369px, Desktop large: 590×369px
const categoryImageMap: Record<string, ResponsiveImage> = {
  Beef: {
    mobile: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=325&h=369&fit=crop",
  },
  Breakfast: {
    mobile: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=325&h=369&fit=crop",
  },
  Chicken: {
    mobile: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=325&h=369&fit=crop",
  },
  Dessert: {
    mobile: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=342&h=369&fit=crop",
    tabletLarge: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=704&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=325&h=369&fit=crop",
    desktopLarge: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=590&h=369&fit=crop",
  },
  Desserts: {
    mobile: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=342&h=369&fit=crop",
    tabletLarge: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=704&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=325&h=369&fit=crop",
    desktopLarge: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=590&h=369&fit=crop",
  },
  Goat: {
    mobile: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=342&h=369&fit=crop",
    tabletLarge: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=704&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=325&h=369&fit=crop",
  },
  Lamb: {
    mobile: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=325&h=369&fit=crop",
  },
  Miscellaneous: {
    mobile: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=325&h=369&fit=crop",
    desktopLarge: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=590&h=369&fit=crop",
  },
  Pasta: {
    mobile: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=325&h=369&fit=crop",
    desktopLarge: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=590&h=369&fit=crop",
  },
  Pork: {
    mobile: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=342&h=369&fit=crop",
    tabletLarge: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=704&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=325&h=369&fit=crop",
    desktopLarge: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=590&h=369&fit=crop",
  },
  Seafood: {
    mobile: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=325&h=369&fit=crop",
  },
  Side: {
    mobile: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=325&h=369&fit=crop",
  },
  Starter: {
    mobile: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=325&h=369&fit=crop",
  },
  Soup: {
    mobile: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=325&h=369&fit=crop",
  },
  Vegan: {
    mobile: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=325&h=369&fit=crop",
  },
  Vegetarian: {
    mobile: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=343&h=250&fit=crop",
    tablet: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=342&h=369&fit=crop",
    desktop: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=325&h=369&fit=crop",
  },
};

/**
 * Отримує URL зображення для категорії з урахуванням розміру екрану та розміру картки
 * @param categoryName - Назва категорії
 * @param breakpoint - Breakpoint: 'mobile', 'tablet', або 'desktop'
 * @param imageSize - Розмір зображення: 'small' або 'large' (для tablet/desktop)
 * @returns URL зображення або undefined якщо не знайдено
 */
export const getCategoryImageUrl = (categoryName: string, breakpoint: "mobile" | "tablet" | "desktop" = "desktop", imageSize: "small" | "large" = "small"): string | undefined => {
  const images = categoryImageMap[categoryName];
  if (!images) return undefined;

  // Mobile завжди використовує один розмір
  if (breakpoint === "mobile") {
    return images.mobile;
  }

  // Для tablet та desktop використовуємо small або large залежно від розміру картки
  if (breakpoint === "tablet") {
    return imageSize === "large" ? images.tabletLarge : images.tablet;
  }

  if (breakpoint === "desktop") {
    return imageSize === "large" ? images.desktopLarge : images.desktop;
  }

  return images.desktop;
};

/**
 * Отримує responsive зображення для категорії
 * @param categoryName - Назва категорії
 * @returns Об'єкт з mobile, tablet, desktop версіями або undefined
 */
export const getCategoryResponsiveImages = (categoryName: string): ResponsiveImage | undefined => {
  return categoryImageMap[categoryName];
};
