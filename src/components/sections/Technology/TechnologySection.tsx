import { Technology } from "../../../../sanity.types";

export const TechnologySection = ({
  allTechnologyData,
}: {
  allTechnologyData: { allTechnology: Technology[] };
}) => {
  return (
    <section>
      <h3>Technology</h3>
      {allTechnologyData.allTechnology.map((technology) => {
        return <div key={`technology-${technology.title}`}>{technology.title}</div>;
      })}
    </section>
  );
};
