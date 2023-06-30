/**
 * emojis from https://twemoji.twitter.com/
 */

import { useRef, useState, useCallback, useMemo } from "react";

import ControlPanel from "./ControlPanel";
import Board from "./Board";
import Celebration from "./Celebration";

import { DEFAULT_CANDIDATES_NUMBER } from "./config";

export default function LuckyDraw(props) {
  const { initialSize } = props;

  const [size, setSize] = useState(initialSize);
  const nItems = useMemo(() => size * size, [size]);

  const initalItems = useMemo(
    () => DEFAULT_CANDIDATES_NUMBER.slice(0, nItems),
    [nItems]
  );
  const [items, setItems] = useState(initalItems);
  const [drawSpeed, setDrawSpeed] = useState(10);
  const [type, setType] = useState("countries");

  const isCompleted = useMemo(
    () => items.filter((it) => !it.flipped).length === 1,
    [items]
  );

  return (
    <div>
      <ControlPanel
        drawSpeed={drawSpeed}
        setDrawSpeed={setDrawSpeed}
        size={size}
        setSize={setSize}
        type={type}
        setType={setType}
        initalItems={initalItems}
        items={items}
        setItems={setItems}
      />
      <Board size={size} items={items} type={type} />
      {isCompleted && <Celebration />}
    </div>
  );
}
