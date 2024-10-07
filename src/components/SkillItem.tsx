import { MouseEvent, useContext } from "react";

import { MainContext } from "@/context/MainContext";
import { Skill } from "../../sanity.types";
import styles from "./SkillItem.module.scss";

export const SkillItem = ({ skill }: { skill: Skill }) => {
  const { selectedSkillId, setSelectedSkillId } = useContext(MainContext);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target;

    if (!(target instanceof HTMLDivElement)) return;

    const dataId = target.getAttribute("data-id");

    if (!dataId) return;

    const newSelectedId = dataId === selectedSkillId ? "" : dataId;

    setSelectedSkillId(newSelectedId);
  };

  return (
    <div
      className={styles.item}
      data-id={skill._id}
      onClick={handleClick}
      data-selected={selectedSkillId === skill._id}
    >
      {skill.title}
    </div>
  );
};
