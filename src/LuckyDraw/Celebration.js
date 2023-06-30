import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Celebration() {
  const { width } = useWindowSize();

  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return (
    <div data-testid="confetti-container">
      <Confetti
        recycle={false}
        width={width}
        height={height}
        numberOfPieces={700}
      />
    </div>
  );
}
