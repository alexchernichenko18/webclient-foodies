# Зображення категорій

Ця папка містить зображення для карток категорій.

## Інструкція по додаванню зображень:

1. Відкрийте макет `Foodies.fig` в Figma
2. Знайдіть секцію з категоріями (CATEGORIES section)
3. Для кожної категорії:

   - Виберіть зображення категорії
   - Експортуйте як WebP (рекомендовано) або PNG
   - Назвіть файл відповідно до назви категорії (lowercase, з підкресленнями):
     - `beef.webp` для "Beef"
     - `breakfast.webp` для "Breakfast"
     - `chicken.webp` для "Chicken"
     - `desserts.webp` для "Desserts"
     - `lamb.webp` для "Lamb"
     - `miscellaneous.webp` для "Miscellaneous"
     - `pasta.webp` для "Pasta"
     - `pork.webp` для "Pork"
     - `seafood.webp` для "Seafood"
     - `side.webp` для "Side"
     - `starter.webp` для "Starter"
     - `soup.webp` для "Soup"
     - `vegan.webp` для "Vegan"
     - `vegetarian.webp` для "Vegetarian"
     - `goat.webp` для "Goat"

4. Збережіть файли в цю папку (`src/assets/images/categories/`)

5. Оновіть `src/utils/categoryImages.ts`:
   - Додайте імпорти для кожного зображення
   - Замініть URL в `categoryImageMap` на імпорти

## Приклад оновлення categoryImages.ts:

```typescript
import beefImage from "../../assets/images/categories/beef.webp";
import breakfastImage from "../../assets/images/categories/breakfast.webp";
// ... інші імпорти

const categoryImageMap: Record<string, string> = {
  Beef: beefImage,
  Breakfast: breakfastImage,
  // ... інші категорії
};
```

## Рекомендації:

- Використовуйте формат WebP для кращої оптимізації
- Розмір зображення: мінімум 400x400px (краще 800x800px для retina)
- Оптимізуйте зображення перед додаванням (можна використати онлайн інструменти)
