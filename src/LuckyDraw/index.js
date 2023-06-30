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
  const timerRef = useRef();

  const [size, setSize] = useState(initialSize);
  const nItems = useMemo(() => size * size, [size]);

  const initalItems = useMemo(
    () => DEFAULT_CANDIDATES_NUMBER.slice(0, nItems),
    [nItems]
  );
  const [items, setItems] = useState(initalItems);

  const [drawSpeed, setDrawSpeed] = useState(10);

  const isCompleted = useMemo(
    () => items.filter((it) => !it.flipped).length === 1,
    [items]
  );

  const handleReset = useCallback(() => {
    setItems(initalItems);
  }, [setItems, initalItems]);
  const [type, setType] = useState("countries");

  const removeTimer = useCallback(() => {
    console.log("Stop trigger");
    clearInterval(timerRef.current);
    timerRef.current = null;
  });
  
  const flipOne = useCallback(() => {
    setItems((items) => {
      // flip one item that is not flipped
      const unflippedItems = items.filter((item) => !item.flipped);
      const shouldStop = unflippedItems.length === 1;
      if (shouldStop) {
        removeTimer();
        return items;
      }
      console.log("Eliminate");
      const idToFlip = pickOneRandomly(unflippedItems).id;
      return items.map((v) =>
        v.id === idToFlip
          ? {
              ...v,
              flipped: true,
            }
          : v
      );
    });
  }, []);

  const createTimer = useCallback(() => {
    console.log("Create new Timer");
    timerRef.current = setInterval(() => {
      flipOne();
    }, 300 / drawSpeed);
  }, [drawSpeed]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      removeTimer();
      createTimer();
    }
  }, []);

  return (
    <div>
      <ControlPanel
        draw={createTimer}
        drawSpeed={drawSpeed}
        setDrawSpeed={(v) => {
          setDrawSpeed(v);
          resetTimer();
        }}
        setItems={setItems}
        isCompleted={isCompleted}
        items={items}
        candidates={candidates}
        handleReset={handleReset}
        setSize={setSize}
        size={size}
        type={type}
        setType={setType}
      />
      <Board size={size} items={items} type={type} />
      {isCompleted && <Celebration />}
    </div>
  );
}
