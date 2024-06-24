import { Line } from "react-chartjs-2";
import { HttpMethod, useApiCall } from "../../hooks";
import { CardData } from "./CardData";

import { AddMore } from "./AddMore";
import { Entry, context } from "../../context";
import { useContext, useEffect, useRef, useState } from "react";
import { SNAPSHOT_ENDPOINT } from "../../constants";
import { SnapshotResponse } from "../types";
import { Loader } from "../Loader";

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  pointBackgroundColor: "#0000",
  pointBorderColor: "#0000",
  pointHoverBackgroundColor: "#ababab",
  pointRadius: 2,
  pointHoverRadius: 5,
  borderColor: "#4db8b1",
  borderWidth: 2,
  borderCapStyle: "round",
  backgroundColor: "#cfece9",
  fill: true,
  maintainAspectRatio: false,
};

interface CardViewProps {
  entry: Entry;
}

export function CardView({ entry }: Readonly<CardViewProps>) {
  const { data, loading } = useApiCall<SnapshotResponse>({
    url: SNAPSHOT_ENDPOINT,
    method: HttpMethod.POST,
    body: {
      metric: entry.metric.id,
      segmentKey: entry.segment.id,
      segmentId: entry.segmentValue.id,
    },
  });
  const { updateEntry } = useContext(context);
  const containerRef = useRef<HTMLDivElement>(null);

  const [chartSize, setChartSize] = useState({
    width: 300,
    height: 300,
  });

  // useEffect without any dependency array.
  // It will run for every state change, thus giving
  // us correct size of the canvas element showing the chart
  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate width for chart
      // -> 100px : Width of the text data
      // -> 24px : Width of the add more icon on each side
      // -> 400px : Minimum width of the container
      let chartWidth =
        (containerRef.current?.clientWidth ?? 400) - 100 - 24 * 2;
      let chartHeight = 250;

      const viewportWidth = window.innerWidth;
      // For smaller viewports, reduce the chart size by 25%
      if (viewportWidth < 480) {
        chartWidth *= 0.75;
        chartHeight *= 0.75;
      }

      setChartSize({ width: chartWidth, height: chartHeight });
    });

    return () => clearTimeout(timer);
  });

  const handleClick = () => {
    updateEntry({
      ...entry,
      mode: "edit",
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  const title = `${entry.metric.name}, ${entry.segment.name}, ${entry.segmentValue.name}`;
  const cardData = data.data.values.map(({ value }) => value);
  const chartData = {
    labels: data.data.values.map((d) => d.date),
    datasets: [
      {
        data: data.data.values.map((d) => d.value),
      },
    ],
  };

  return (
    <div
      className="rounded-lg py-4 px-1 cursor-pointer"
      onClick={handleClick}
      ref={containerRef}
    >
      <div className="flex">
        <AddMore position={entry.position} />
        <div className="grow">
          <h2>{title}</h2>
          <div className="flex items-end justify-between w-full">
            <CardData data={cardData} />
            <div
              className="grow"
              style={{
                width: chartSize.width,
                height: chartSize.height,
              }}
            >
              <Line options={options} data={chartData} />
            </div>
          </div>
        </div>
        <AddMore position={entry.position + 1} />
      </div>
    </div>
  );
}
