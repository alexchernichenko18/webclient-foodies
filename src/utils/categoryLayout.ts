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
 * @param index - Індекс категорії в масиві (0-based)
 * @returns Розмір картки
 */
export const getTabletCardSize = (index: number): CardSize => {
  // Патерн з макету для 11 категорій (0..10) + окрема картка ALL CATEGORIES в кінці:
  // Ряд 1: S,S -> 0,1
  // Ряд 2: L   -> 2
  // Ряд 3: S,S -> 3,4
  // Ряд 4: S,S -> 5,6
  // Ряд 5: L   -> 7
  // Ряд 6: S,S -> 8,9
  // Ряд 7: S + ALL -> 10 (+ ALL окремо)
  const pattern: CardSize[] = ["small", "small", "large-tablet", "small", "small", "small", "small", "large-tablet", "small", "small", "small"];

  return pattern[index] ?? "small";
};

/**
 * Визначає розмір картки для категорії на desktop на основі позиції
 * @param index - Індекс категорії в масиві (0-based)
 * @returns Розмір картки
 */
export const getDesktopCardSize = (index: number): CardSize => {
  // Патерн з макету (перші 12 слотів; якщо категорій менше — зайві не використовуються):
  // Row1: S,S,L
  // Row2: L,S,S
  // Row3: S,L,S
  // Row4: L,S,S
  // У термінах "4 базові колонки": S=span1, L=span2.
  const pattern: CardSize[] = [
    "small", // 0
    "small", // 1
    "large-desktop", // 2
    "large-desktop", // 3
    "small", // 4
    "small", // 5
    "small", // 6
    "large-desktop", // 7
    "small", // 8
    "large-desktop", // 9
    "small", // 10
    "small", // 11
  ];

  return pattern[index] ?? "small";
};

/**
 * Визначає розмір зображення для завантаження
 * @param breakpoint - Breakpoint
 * @param cardSize - Розмір картки
 * @returns Розмір зображення ('small' або 'large')
 */
export const getImageSize = (breakpoint: "mobile" | "tablet" | "desktop", cardSize: CardSize): "small" | "large" => {
  if (breakpoint === "mobile") {
    return "small"; // Всі mobile зображення однакового розміру (343×250)
  }

  if (cardSize === "large-tablet" || cardSize === "large-desktop") {
    return "large";
  }

  return "small";
};
