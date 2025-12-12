/**
 * Визначає розмір та позицію карток категорій для різних breakpoints
 *
 * Структура сітки на основі макету:
 *
 * Tablet (768px-1439px):
 * - Ряд 1: 2 маленькі (342×369) - індекси 0, 1
 * - Ряд 2: 1 велика (704×369) - індекс 2 (Desserts)
 * - Ряд 3: 2 маленькі (342×369) - індекси 3, 4
 * - Ряд 4: 1 велика (704×369) - індекс 5 (Goat)
 * - Ряд 5: 1 велика (704×369) - індекс 6 (Pork)
 * - Ряд 6: 2 маленькі (342×369) - індекси 7, 8
 * - Ряд 7: 2 маленькі (342×369) - індекси 9, 10 + ALL CATEGORIES
 *
 * Desktop (1440px+):
 * - Ряд 1: 2 маленькі (325×369), 1 велика (590×369) - індекси 0, 1, 2 (Desserts)
 * - Ряд 2: 1 велика (590×369), 2 маленькі (325×369) - індекси 3 (Miscellaneous), 4, 5
 * - Ряд 3: 1 маленька (325×369), 1 велика (590×369), 1 маленька (325×369) - індекси 6 (Pasta), 7, 8
 * - Ряд 4: 1 велика (590×369), 2 маленькі (325×369) - індекси 9 (Pork), 10, 11 + ALL CATEGORIES
 */

export type CardSize = "small" | "large-tablet" | "large-desktop";

export interface CategoryLayout {
  size: CardSize;
  imageSize: "small" | "large";
}

/**
 * Визначає розмір картки для категорії на tablet на основі позиції
 * @param categoryName - Назва категорії (для додаткової перевірки)
 * @param index - Індекс категорії в масиві (0-based)
 * @returns Розмір картки
 */
export const getTabletCardSize = (categoryName: string, index: number): CardSize => {
  // Великі картки на tablet (704×369) за індексами: 2, 5, 6
  // Але також перевіряємо назви для надійності
  const largeTabletIndices = [2, 5, 6];
  const largeTabletNames = ["Desserts", "Dessert", "Goat", "Pork"];

  if (largeTabletIndices.includes(index) || largeTabletNames.includes(categoryName)) {
    return "large-tablet";
  }

  return "small";
};

/**
 * Визначає розмір картки для категорії на desktop на основі позиції
 * @param categoryName - Назва категорії (для додаткової перевірки)
 * @param index - Індекс категорії в масиві (0-based)
 * @returns Розмір картки
 */
export const getDesktopCardSize = (categoryName: string, index: number): CardSize => {
  // Великі картки на desktop (590×369) за індексами: 2, 3, 6, 9
  // Але також перевіряємо назви для надійності
  const largeDesktopIndices = [2, 3, 6, 9];
  const largeDesktopNames = ["Desserts", "Dessert", "Miscellaneous", "Pasta", "Pork"];

  if (largeDesktopIndices.includes(index) || largeDesktopNames.includes(categoryName)) {
    return "large-desktop";
  }

  return "small";
};

/**
 * Визначає розмір зображення для завантаження
 * @param categoryName - Назва категорії
 * @param breakpoint - Breakpoint
 * @param cardSize - Розмір картки
 * @returns Розмір зображення ('small' або 'large')
 */
export const getImageSize = (categoryName: string, breakpoint: "mobile" | "tablet" | "desktop", cardSize: CardSize): "small" | "large" => {
  if (breakpoint === "mobile") {
    return "small"; // Всі mobile зображення однакового розміру (343×250)
  }

  if (cardSize === "large-tablet" || cardSize === "large-desktop") {
    return "large";
  }

  return "small";
};
