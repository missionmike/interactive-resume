import { ThemeOptions } from "../../../sanity.types";
import styles from "./ResumeHeading.module.scss";

export const ResumeHeading = ({ themeOptions }: { themeOptions: ThemeOptions }) => {
  return (
    <h1 className={styles.userTitleHeading}>
      {themeOptions?.userName}
      <br />
      <span className={styles.userTitle}>{themeOptions?.userTitle}</span>
      <br />
      <span className={styles.userMeta}>
        {themeOptions?.userContact}
        <span className={styles.separator}>|</span>
        {themeOptions?.userLocation}
      </span>
    </h1>
  );
};
