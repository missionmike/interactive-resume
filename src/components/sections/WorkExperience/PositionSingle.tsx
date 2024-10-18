"use client";

import { useEffect, useRef, useState } from "react";

import { PositionWithRefs } from "@/graphql/getPositions";
import { Projects } from "./Projects";
import cx from "classnames";
import { formatDate } from "@/lib/format";
import styles from "./PositionSingle.module.scss";

export const PositionSingle = ({
  position,
  showDates,
}: {
  position: PositionWithRefs;
  showDates: boolean;
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setIsSticky(stickyRef.current.getBoundingClientRect().top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div key={`position-${position._id}`}>
        <h4 className={isSticky ? "stuck" : ""} ref={stickyRef}>
          {position.title}{" "}
          {showDates ? (
            <span className="dates">
              &mdash; {formatDate(position?.dateStart)} to {formatDate(position?.dateEnd)}
            </span>
          ) : null}
          <span className={cx(styles.companyName, isSticky ? "visible" : "")}>
            {position.company.name}
          </span>
        </h4>
        {position?.projects ? <Projects projects={position.projects} /> : null}
      </div>
    </div>
  );
};
