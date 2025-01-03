import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { CloseIcon } from "@sanity/icons";
import { Icon } from "@iconify/react";
import { PortableTextCustom } from "@/components/PortableTextCustom";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./SkillItem.module.scss";

export const SkillItem = ({ skill }: { skill: SkillWithDescriptionRaw }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        disabled={!skill?.descriptionRaw}
        variant="outlined"
        color="primary"
        className={styles.item}
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          color: theme.palette.primary.main,
          "&.Mui-disabled": {
            color: theme.palette.primary.main,
            borderColor: "transparent",
          },
        })}
      >
        {skill?.icon ? <Icon icon={skill.icon} className={styles.icon} /> : null}
        {skill.title}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: "1em", padding: "16px 48px" }}
        >
          {skill?.icon ? <Icon icon={skill.icon} className={styles.icon} /> : null}
          {skill.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
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
          <PortableTextCustom value={skill.descriptionRaw} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
