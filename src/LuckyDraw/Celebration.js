import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Celebration() {
  const { width, height } = useWindowSize();

  return (
    <div data-testid="confetti-container">
      <Confetti recycle={false} width={width} height={height} />
    </div>
  );
}
