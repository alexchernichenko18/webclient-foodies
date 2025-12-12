/**
 * Маппінг назв категорій до зображень з підтримкою responsive images
 *
 * Структура:
 * - mobile/ - 343×250px (і 686×500 для 2x)
 * - tablet/small - 342×369px (і 684×738 для 2x)
 * - tablet/large - 704×369px (і 1408×738 для 2x)
 * - desktop/small - 325×369px (і 650×738 для 2x)
 * - desktop/large - 590×369px (і 1180×738 для 2x)
 */

// TODO: Після оптимізації зображень, додайте імпорти для кожної категорії та breakpoint
// Приклад:
// import beefMobile1x from "../assets/images/categories/mobile/beef@1x.webp";
// import beefMobile2x from "../assets/images/categories/mobile/beef@2x.webp";
// ... аналогічно для tablet/desktop small/large

export interface ImageSource2x {
  src1x: string;
  src2x?: string;
}

// Тип для responsive зображення
export interface ResponsiveImage {
  mobile: string | ImageSource2x;
  tablet: string | ImageSource2x; // small
  tabletLarge?: string | ImageSource2x; // large-tablet
  desktop: string | ImageSource2x; // small
  desktopLarge?: string | ImageSource2x; // large-desktop
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

const to2xUrl = (url: string): string => {
  // Unsplash підтримує dpr=2. Якщо буде локальний import — src2x задасте явно.
  if (url.includes("dpr=")) return url;
  return url.includes("?") ? `${url}&dpr=2` : `${url}?dpr=2`;
};

const normalize2x = (value: string | ImageSource2x): Required<ImageSource2x> => {
  if (typeof value === "string") {
    return { src1x: value, src2x: to2xUrl(value) };
  }
  return { src1x: value.src1x, src2x: value.src2x ?? to2xUrl(value.src1x) };
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
    return typeof images.mobile === "string" ? images.mobile : images.mobile.src1x;
  }

  // Для tablet та desktop використовуємо small або large залежно від розміру картки
  if (breakpoint === "tablet") {
    const variant = imageSize === "large" ? images.tabletLarge : images.tablet;
    if (!variant) return undefined;
    return typeof variant === "string" ? variant : variant.src1x;
  }

  if (breakpoint === "desktop") {
    const variant = imageSize === "large" ? images.desktopLarge : images.desktop;
    if (!variant) return undefined;
    return typeof variant === "string" ? variant : variant.src1x;
  }

  return typeof images.desktop === "string" ? images.desktop : images.desktop.src1x;
};

/**
 * Повертає src + srcSet (1x/2x) для <img srcSet> з урахуванням breakpoint та розміру картки
 */
export const getCategoryImageSourceSet = (
  categoryName: string,
  breakpoint: "mobile" | "tablet" | "desktop" = "desktop",
  imageSize: "small" | "large" = "small"
): { src: string; srcSet: string } | undefined => {
  const images = categoryImageMap[categoryName];
  if (!images) return undefined;

  let variant: string | ImageSource2x | undefined;

  if (breakpoint === "mobile") {
    variant = images.mobile;
  } else if (breakpoint === "tablet") {
    variant = imageSize === "large" ? images.tabletLarge : images.tablet;
  } else {
    variant = imageSize === "large" ? images.desktopLarge : images.desktop;
  }

  if (!variant) return undefined;

  const normalized = normalize2x(variant);
  return {
    src: normalized.src1x,
    srcSet: `${normalized.src1x} 1x, ${normalized.src2x} 2x`,
  };
};

/**
 * Отримує responsive зображення для категорії
 * @param categoryName - Назва категорії
 * @returns Об'єкт з mobile, tablet, desktop версіями або undefined
 */
export const getCategoryResponsiveImages = (categoryName: string): ResponsiveImage | undefined => {
  return categoryImageMap[categoryName];
};
