import Slider from "../Input/Slider";
import { DEFAULT_CANDIDATES_NUMBER } from "./config";
import { useRef, useCallback, useMemo } from "react";
import { pickOneRandomly } from "../utils/ArrayUtils";
export default function ControlPanel({
  drawSpeed,
  setDrawSpeed,
  initalItems,
  items,
  setItems,
  size,
  setSize,
  type,
  setType,
}) {
  const timerRef = useRef();

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

  const handleReset = useCallback(() => {
    setItems(initalItems);
  }, [setItems, initalItems]);

  const isRunning = useMemo(
    () =>
      items.filter((it) => it.flipped).length >= 1 &&
      items.filter((it) => !it.flipped).length > 1,
    [items]
  );
  return (
    <div>
      <div className="input-group">
        <div className="slider-group">
          <fieldset>
            <legend>size</legend>
            <Slider
              data-testid={"size-slider"}
              min={2}
              value={size}
              setValue={(v) => {
                setSize(v);
                setItems(DEFAULT_CANDIDATES_NUMBER.slice(0, v * v));
              }}
            />
          </fieldset>
        </div>
        <div className="slider-group">
          <fieldset>
            <legend>speed</legend>
            <Slider
              value={drawSpeed}
              setValue={(v) => {
                setDrawSpeed(v);
                resetTimer();
              }}
            />
          </fieldset>
        </div>

        <fieldset>
          <legend>type</legend>

          {["countries", "numbers"].map((v) => {
            return (
              <span key={v}>
                <input
                  type="radio"
                  value={v}
                  checked={type === v}
                  onChange={(event) => setType(event.target.value)}
                />
                <label htmlFor={v}>{v}</label>
              </span>
            );
          })}
        </fieldset>
      </div>
      <button
        className="button draw"
        onClick={createTimer}
        disabled={isRunning}
        data-testid="draw-button"
      >
        Draw
      </button>
      <button
        className="button"
        onClick={handleReset}
        data-testid="reset-button"
      >
        Reset
      </button>
    </div>
  );
}
