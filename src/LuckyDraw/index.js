/**
 * emojis from https://twemoji.twitter.com/
 */

import { useRef, useState, useCallback, useMemo } from "react";

import ControlPanel from "./ControlPanel";
import Board from "./Board";
import Celebration from "./Celebration";
import { pickOneRandomly } from "../utils/ArrayUtils";
import { DEFAULT_CANDIDATES_NUMBER } from "./config";

export default function LuckyDraw(props) {
  const { candidates = DEFAULT_CANDIDATES_NUMBER, size: initialSize } = props;
  const [size, setSize] = useState(initialSize);
  const totalSize = useMemo(() => size * size, [size]);
  const [drawSpeed, setDrawSpeed] = useState(10);
  const drawSpeedRef = useRef(drawSpeed);
  const initalItems = useMemo(
    () => DEFAULT_CANDIDATES_NUMBER.slice(0, totalSize),
    [totalSize]
  );
  const [items, setItems] = useState(initalItems);
  const isFinalized = useCallback((items) => {
    return items.filter((item) => !item.out).length === 1;
  }, []);
  const timerRef = useRef();
  const isCompleted = useRef(false);
  const isStarted = useRef(false);
  const handleReset = useCallback(() => {
    isCompleted.current = false;
    setItems(initalItems);
  }, [setItems, initalItems]);
  const [type, setType] = useState("countries");

  const eliminate = useCallback(() => {
    if (isCompleted.current) {
      console.log("Stop trigger");
      clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }

    setItems((items) => {
      // flip one item that is not "out"
      const indexes = items.filter((item) => !item.out);
      if (indexes.length === 1) {
        isCompleted.current = true;
        clearInterval(timerRef.current);
        timerRef.current = null;
        return items;
      }
      console.log("Eliminate");
      const index = pickOneRandomly(indexes).id;
      return items.map((v, i) => {
        if (i === index) {
          return {
            ...v,
            flipped: !v.flipped,
            out: true
          };
        }
        return v;
      });
    });
  }, []);

  const resetTimer = useCallback(() => {
    console.log("useCallback: resetTimer");

    // remove timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // create timer

    console.log("Create new Timer");
    timerRef.current = setInterval(() => {
      eliminate();
    }, 300 / drawSpeedRef.current);
  }, []);

  return (
    <div>
      {isFinalized(items) ? "isFinalized" : "F"}
      <ControlPanel
        draw={resetTimer}
        drawSpeed={drawSpeed}
        drawSpeedRef={drawSpeedRef}
        setDrawSpeed={setDrawSpeed}
        setItems={setItems}
        isFinalized={isFinalized}
        items={items}
        isCompleted={isCompleted}
        initalItems={initalItems}
        candidates={candidates}
        handleReset={handleReset}
        setSize={setSize}
        size={size}
        type={type}
        setType={setType}
      />
      <Board size={size} items={items} type={type} />
      {isFinalized(items) && <Celebration />}
    </div>
  );
}
