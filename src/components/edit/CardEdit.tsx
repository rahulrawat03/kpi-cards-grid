import { useState } from "react";
import { Dropdown, Option } from "../Dropdown";
import { CardEditCta } from "./CardEditCta";
import { HttpMethod, useApiCall } from "../../hooks";
import { MetricResponse, SegmentResponse } from "../types";
import { METRICS_ENDPOINT, SEGMENTS_ENDPOINT } from "../../constants";

import { Entry } from "../../context";
import { Loader } from "../Loader";

interface CardEditProps {
  entry: Entry;
}

export function CardEdit({ entry }: CardEditProps) {
  const [metric, setMetric] = useState<Option>(() =>
    getOption(entry, "metric")
  );
  const [segment, setSegment] = useState<Option>(() =>
    getOption(entry, "segment")
  );
  const [segmentValue, setSegmentValue] = useState<Option>(() =>
    getOption(entry, "segmentValue")
  );

  const { loading: loadingMetrics, data: metrics } = useApiCall<MetricResponse>(
    {
      url: METRICS_ENDPOINT,
      method: HttpMethod.GET,
    }
  );
  const { loading: loadingSegments, data: segments } =
    useApiCall<SegmentResponse>({
      url: SEGMENTS_ENDPOINT,
      method: HttpMethod.GET,
    });

  if (loadingMetrics || loadingSegments) {
    return <Loader />;
  }

  if (!(metrics && segments)) {
    return null;
  }

  const metricOptions = metrics.data.map((metric) => ({
    label: metric.displayName,
    value: metric.id,
  }));
  const segmentOptions = segments.data.map((segment) => ({
    label: segment.displayName,
    value: segment.segmentKey,
  }));
  const segmentValueOptions = (
    segments.data.find(({ segmentKey }) => segmentKey === segment.value)
      ?.values ?? []
  ).map((segmentValue) => ({
    label: segmentValue.displayName,
    value: segmentValue.segmentId,
  }));

  const handleSegmentKeySelection = (option: Option) => {
    // Reset Segment Id if selected segment key is different
    // from the previous one
    if (option.value !== segment?.value) {
      setSegmentValue({
        label: "",
        value: "",
      });
    }
    setSegment(option);
  };

  return (
    <div className="w-full">
      <Dropdown
        label={metric?.label ?? ""}
        options={metricOptions}
        handleSelect={setMetric}
      />
      <Dropdown
        label={segment?.label ?? ""}
        options={segmentOptions}
        handleSelect={handleSegmentKeySelection}
      />
      {(segmentValueOptions.length > 0 || segmentValue.value) && (
        <Dropdown
          label={segmentValue?.label ?? ""}
          options={segmentValueOptions}
          handleSelect={setSegmentValue}
        />
      )}
      <CardEditCta
        position={entry.position}
        published={entry.published}
        metric={metric}
        segment={segment}
        segmentValue={segmentValue}
      />
    </div>
  );
}

function getOption(
  entry: Entry,
  type: "metric" | "segment" | "segmentValue"
): Option {
  switch (type) {
    case "metric":
      return {
        label: entry.metric?.name ?? "",
        value: entry.metric?.id ?? "",
      };
    case "segment":
      return {
        label: entry.segment?.name ?? "",
        value: entry.segment?.id ?? "",
      };
    case "segmentValue":
      return {
        label: entry.segmentValue?.name ?? "",
        value: entry.segmentValue?.id ?? "",
      };
  }
}
