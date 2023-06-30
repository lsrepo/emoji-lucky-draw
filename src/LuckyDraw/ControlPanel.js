import { DEFAULT_CANDIDATES_NUMBER } from "./config";
import Slider from "../Input/Slider";
export default function ControlPanel({
  draw,
  drawSpeed,
  drawSpeedRef,
  setDrawSpeed,
  setItems,
  isFinalized,
  items,
  isCompleted,
  initalItems,
  candidates,
  handleReset,
  size,
  setSize,
  type,
  setType
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="slider-group">
          <fieldset>
            <legend>size</legend>
            <Slider
              data-testid={ "size-slider"}
              min={2}
              value={size}
              setValue={(v) => {
                setSize(v);
                setItems(DEFAULT_CANDIDATES_NUMBER.slice(0, v * v));
                isCompleted.current = false;
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
                drawSpeedRef.current = v;
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
        onClick={() => draw()}
        disabled={isFinalized(items)}
        data-testid="draw-button"
      >
        Draw
      </button>
      <button className="button" onClick={() => handleReset()}      data-testid="reset-button">
        Reset
      </button>
    </div>
  );
}
