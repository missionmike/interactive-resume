"use client";

import { PositionSingle } from "./PositionSingle";
import { PositionWithRefs } from "@/graphql/getPositions";

export const PositionsList = ({ positions }: { positions: PositionWithRefs[] }) => {
  return (
    <div>
      {positions.map((position) => (
        <PositionSingle
          key={`position-single-${position._id}`}
          position={position}
          showDates={positions.length > 1}
        />
      ))}
    </div>
  );
};
