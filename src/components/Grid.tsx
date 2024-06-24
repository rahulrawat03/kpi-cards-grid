import { useContext } from "react";
import { context } from "../context";
import { Card } from "./Card";
import { Plus } from "react-feather";

export function Grid() {
  const { data, insertEntry } = useContext(context);

  if (data.length === 0) {
    return (
      <div>
        <button
          onClick={() => insertEntry()}
          className="bg-white rounded-full inline-block m-auto"
        >
          <Plus size={64} />
        </button>
        <h2 className="mt-2 text-white">Start adding cards...</h2>
      </div>
    );
  }

  return (
    <div
      className="bg-white p-4 rounded-md w-full grid relative overflow-hidden"
      style={{
        gridTemplateColumns:
          "repeat(auto-fit, minmax(max(400px, calc(100% / 3)), 1fr))",
      }}
    >
      {data.map((entry) => (
        <div
          key={`${entry.metric.id}-${entry.segment.id}-${entry.segmentValue.id}-${entry.position}`}
          className="origin-left scale-50 xs-5:scale-[60%] xs-4:scale-[70%] xs-3:scale-[80%] xs-2:scale-[90%] xs:scale-100"
        >
          <Card entry={entry} />
        </div>
      ))}
    </div>
  );
}
