export default function Slider({ value, setValue, min = 1, max = 10 }) {
  return (
    <div className="slidecontainer">
      <input
        onInput={(e) => {
          setValue(e.target.value);
        }}
        type="range"
        min={min}
        max={max}
        value={value}
        className="slider"
      />
    </div>
  );
}
