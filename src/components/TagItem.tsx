import cx from "classnames";
import styles from "./TagItem.module.scss";

export const TagItem = ({ title, className = "" }: { title: string; className?: string }) => (
  <div className={cx(styles.tagItem, className)}>{title}</div>
);
