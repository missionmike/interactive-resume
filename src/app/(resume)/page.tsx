"use client";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>Michael R. Dinerstein</h1>
      <h2>Senior Full Stack Software Engineer</h2>
      <section>
        {/* {technologies.map((technology) => {
          return <div key={`technology-${technology.title}`}>{technology.title}</div>;
        })} */}
      </section>
    </main>
  );
}
