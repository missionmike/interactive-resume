import { Technology } from "../../../sanity.types";
import styles from "./TechnologySection.module.scss";

export const TechnologySection = ({
  allTechnologyData,
}: {
  allTechnologyData: { allTechnology: Technology[] };
}) => {
  return (
    <section className={styles.section}>
      <h2>Technology</h2>
      <div className={styles.tagContainer}>
        {allTechnologyData.allTechnology.map((technology) => {
          return (
            <div key={`technology-${technology.title}`} className={styles.tagItem}>
              {technology.title}
            </div>
          );
        })}
      </div>
    </section>
  );
};
