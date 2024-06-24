import { Metric, Segment } from "../types";

export interface MetricResponse {
  data: Metric[];
}

export interface SegmentResponse {
  data: Segment[];
}

export interface SnapshotResponse {
  data: {
    // Ignoring other values since they will be same as payload
    values: [
      {
        date: string;
        value: number;
      }
    ];
  };
}
