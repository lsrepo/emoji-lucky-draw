import LuckyDraw from "./LuckyDraw";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h2>Lucky Draw</h2>
      <LuckyDraw initialSize={5} />
    </div>
  );
}
