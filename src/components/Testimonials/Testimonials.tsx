import { useState } from "react";
import styles from "./Testimonials.module.scss";

const testimonials = [
  {
    id: 1,
    text:
      "Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!",
    author: "LARRY PAGEIM",
  },
  {
    id: 2,
    text:
      "The recipes are simple and easy to follow. Even as a beginner, I managed to cook an amazing dinner for my family.",
    author: "JANE DOE",
  },
  {
    id: 3,
    text:
      "I love how visually appealing and well-explained each recipe is. Cooking has become a real pleasure!",
    author: "MICHAEL SMITH",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { text, author } = testimonials[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.subtitle}>What our customer say</p>
        <h2 className={styles.title}>TESTIMONIALS</h2>

        <div key={activeIndex} className={styles.card}>
          <span className={styles.quote}>“</span>

          <p className={styles.text}>{text}</p>

          <p className={styles.author}>{author}</p>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === activeIndex
                  ? `${styles.dot} ${styles.active}`
                  : styles.dot
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;