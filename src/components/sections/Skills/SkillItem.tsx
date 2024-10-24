import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { MouseEvent, useContext, useState } from "react";

import Button from "@mui/material/Button";
import { CloseIcon } from "@sanity/icons";
import { DataContext } from "@/context/DataContext";
import { Icon } from "@iconify/react";
import { PortableText } from "next-sanity";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./SkillItem.module.scss";

export const SkillItem = ({ skill }: { skill: SkillWithDescriptionRaw }) => {
  const { selectedSkillId, setSelectedSkillId } = useContext(DataContext);

  const handleClick = (e: MouseEvent) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const dataId = target.getAttribute("data-id");

    if (!dataId) return;

    const newSelectedId = dataId === selectedSkillId ? "" : dataId;

    setSelectedSkillId(newSelectedId);
    setOpen(true);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        disabled={!skill?.descriptionRaw}
        variant="outlined"
        color="primary"
        className={styles.item}
        data-id={skill._id}
        onClick={handleClick}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
          },
        })}
      >
        {skill?.icon ? <Icon icon={skill.icon} className={styles.icon} /> : null}
        {skill.title}
      </Button>
      <Dialog open={open}>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: "1em", padding: "16px 48px" }}
        >
          {skill?.icon ? <Icon icon={skill.icon} className={styles.icon} /> : null}
          {skill.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <PortableText value={skill.descriptionRaw} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
