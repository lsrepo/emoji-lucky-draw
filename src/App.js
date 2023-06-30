import LuckyDraw from "./LuckyDraw";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Lucky Draw</h1>
      <LuckyDraw size={5} />
    </div>
  );
}
