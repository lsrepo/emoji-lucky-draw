import { createIndexedArray } from "../utils/ArrayUtils";
import ReactCardFlip from "react-card-flip";
import TweeterEmoji from "../Emoji";

export default function Board({ size, items, type }) {
  return (
    <div className="board">
      <table>
        <tbody>
          {createIndexedArray(size).map((v, i) => (
            <Row
              key={`row-${i}`}
              size={size}
              items={items}
              index={i}
              type={type}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Row = (props) => {
  const { size, index: rowIndex, items, type } = props;
  return (
    <tr>
      {createIndexedArray(size).map((v, i) => {
        const index = rowIndex * size + i;
        const item = items[index];
        let Component = Cell;
        if (type === "numbers") {
          Component = NumberCell;
        }
        return (
          <Component
            key={i}
            index={index}
            item={item}
            size={size}
            type={type}
          />
        );
      })}
    </tr>
  );
};

const NumberCell = (props) => {
  const { item, size, type, index } = props;
  let content = <span>{index}</span>;
  return (
    <td>
      <div
        style={{
          width: `min(${80 / size}vw, 77px)`,
          height: `min(${80 / size}vw, 77px)`,
          fontSize: "7vmin"
        }}
        data-testid="card"
      >
        <ReactCardFlip isFlipped={item.flipped} flipDirection="horizontal">
          <div>{content}</div>
          <div>{item.backValue}</div>
        </ReactCardFlip>
      </div>
    </td>
  );
};

const Cell = (props) => {
  const { item, size, type, index } = props;
  let content = <TweeterEmoji n={item.frontValue} itemSize={size} />;
  return (
    <td>
      <div
        style={{
          width: `min(${80 / size}vw, 77px)`,
          height: `min(${80 / size}vw, 77px)`
        }}
        data-testid="card"
      >
        <ReactCardFlip isFlipped={item.flipped} flipDirection="horizontal">
          <div>
            {/* <TweeterEmoji n={item.frontValue} itemSize={size} /> */}
            {content}
          </div>
          <div>{item.flipped ? "Flipped" : ""}</div>
        </ReactCardFlip>
      </div>
    </td>
  );
};
