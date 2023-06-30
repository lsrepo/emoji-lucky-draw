import LuckyDraw from "./LuckyDraw";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Lucky Draw</h1>
      <LuckyDraw initialSize={8} />
    </div>
  );
}
