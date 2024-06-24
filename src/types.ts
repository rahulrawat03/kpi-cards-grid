export interface Metric {
  id: string;
  displayName: string;
  isPercentageMetric: boolean;
}

export interface Segment {
  segmentKey: string;
  displayName: string;
  values: SegmentValue[];
}

export interface SegmentValue {
  segmentId: string;
  displayName: string;
}
