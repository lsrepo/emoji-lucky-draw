export default function Slider({ value, setValue, min = 1, max = 10, ...rest}) {
  return (

      <input
        onInput={(e) => {
          setValue(e.target.value);
        }}
        type="range"
        min={min}
        max={max}
        value={value}
        className="slider"
        {...rest}
      />
  );
}
