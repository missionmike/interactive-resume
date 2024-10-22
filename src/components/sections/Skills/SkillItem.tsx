import { MouseEvent, useContext } from "react";

import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { MainContext } from "@/context/MainContext";
import { Skill } from "../../../../sanity.types";
import styles from "./SkillItem.module.scss";

export const SkillItem = ({ skill }: { skill: Skill }) => {
  const { selectedSkillId, setSelectedSkillId } = useContext(MainContext);

  const handleClick = (e: MouseEvent) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const dataId = target.getAttribute("data-id");

    if (!dataId) return;

    const newSelectedId = dataId === selectedSkillId ? "" : dataId;

    setSelectedSkillId(newSelectedId);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      className={styles.item}
      data-id={skill._id}
      onClick={handleClick}
      sx={(theme) => ({
        color: theme.palette.primary.main,
      })}
    >
      {skill?.icon ? <Icon icon={skill.icon} className={styles.icon} /> : null}
      {skill.title}
    </Button>
  );
};
