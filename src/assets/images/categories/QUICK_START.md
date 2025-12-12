# 🚀 Швидкий старт: Оптимізація зображень категорій

## 📐 Розміри для експорту з Figma

### Mobile (до 768px):

- **Розмір картки**: 343 × 250px
- **Експортуйте**: 343 × 250px (або 686 × 500px для retina)
- **Формат**: WebP, якість 80-85%
- **Папка**: `src/assets/images/categories/mobile/`

### Tablet (768px - 1439px):

#### Маленькі картки (342 × 369px):

- **Категорії**: Beef, Breakfast, Lamb, Miscellaneous, Pasta, Seafood, Side, Starter
- **Експортуйте**: 342 × 369px (або 684 × 738px для retina)
- **Папка**: `src/assets/images/categories/tablet/small/`

#### Великі картки (704 × 369px):

- **Категорії**: Desserts, Goat, Pork
- **Експортуйте**: 704 × 369px (або 1408 × 738px для retina)
- **Папка**: `src/assets/images/categories/tablet/large/`

### Desktop (1440px+):

#### Маленькі картки (325 × 369px):

- **Категорії**: Beef, Breakfast, Chicken, Lamb, Goat, Seafood, Side, Starter, Soup, Vegan, Vegetarian
- **Експортуйте**: 325 × 369px (або 650 × 738px для retina)
- **Папка**: `src/assets/images/categories/desktop/small/`

#### Великі картки (590 × 369px):

- **Категорії**: Desserts, Miscellaneous, Pasta, Pork
- **Експортуйте**: 590 × 369px (або 1180 × 738px для retina)
- **Папка**: `src/assets/images/categories/desktop/large/`

---

## 🛠️ Покрокова інструкція

### Крок 1: Відкрийте Squoosh

https://squoosh.app/

### Крок 2: Для кожного PNG файлу

1. **Перетягніть PNG** в Squoosh
2. **Виберіть формат**: WebP
3. **Встановіть якість**: 80-85%
4. **Натисніть "Resize"**
5. **Встановіть розмір** відповідно до breakpoint (див. вище)
6. **Експортуйте** та збережіть в правильну папку

### Крок 3: Назви файлів

Використовуйте **lowercase з дефісами**:

- `beef.webp`
- `breakfast.webp`
- `chicken.webp`
- `desserts.webp` (або `dessert.webp`)
- `lamb.webp`
- `goat.webp`
- `miscellaneous.webp`
- `pasta.webp`
- `pork.webp`
- `seafood.webp`
- `side.webp`
- `starter.webp`
- `soup.webp`
- `vegan.webp`
- `vegetarian.webp`

---

## 📋 Чеклист для кожної категорії

### Приклад для "Beef":

- [ ] Mobile: `beef.webp` (343×250) → `mobile/beef.webp`
- [ ] Tablet small: `beef.webp` (342×369) → `tablet/small/beef.webp`
- [ ] Desktop small: `beef.webp` (325×369) → `desktop/small/beef.webp`

### Приклад для "Desserts":

- [ ] Mobile: `desserts.webp` (343×250) → `mobile/desserts.webp`
- [ ] Tablet small: `desserts.webp` (342×369) → `tablet/small/desserts.webp`
- [ ] Tablet large: `desserts.webp` (704×369) → `tablet/large/desserts.webp`
- [ ] Desktop small: `desserts.webp` (325×369) → `desktop/small/desserts.webp`
- [ ] Desktop large: `desserts.webp` (590×369) → `desktop/large/desserts.webp`

---

## 💡 Важливо!

1. **Картки НЕ квадратні!** Mobile: 343:250, Tablet/Desktop: різні співвідношення
2. **Retina**: Можна експортувати 1x розмір, браузер масштабує
3. **WebP**: Дає 25-35% менший розмір порівняно з PNG
4. **Якість**: 80-85% - оптимальний баланс

---

## 🎯 Після оптимізації

Після того, як всі зображення готові, напишіть мені - я допоможу оновити `categoryImages.ts` для використання реальних зображень замість placeholder URL.
