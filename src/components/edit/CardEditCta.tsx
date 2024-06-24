import { useContext } from "react";
import { context } from "../../context";
import { Option } from "../Dropdown";

interface CardEditCtaProps {
  position: number;
  published: boolean;
  metric: Option;
  segment: Option;
  segmentValue: Option;
}

export function CardEditCta({
  position,
  published,
  metric,
  segment,
  segmentValue,
}: CardEditCtaProps) {
  const { updateEntry, deleteEntry } = useContext(context);

  const handleSave = () => {
    updateEntry({
      mode: "view",
      position: position,
      published: true,
      metric: {
        id: metric.value,
        name: metric.label,
      },
      segment: {
        id: segment.value,
        name: segment.label,
      },
      segmentValue: {
        id: segmentValue.value,
        name: segmentValue.label,
      },
    });
  };

  const handleCancel = () => {
    if (!published) {
      deleteEntry(position);
    } else {
      handleSave();
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="block bg-secondary text-on-secondary grow rounded-md outline-none py-1"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className="block bg-on-primary text-white grow rounded-md outline-none py-1 disabled:bg-gray-400"
        disabled={
          !canSaveDetails({
            metric,
            segment,
            segmentValue,
          })
        }
        onClick={handleSave}
      >
        Add
      </button>
    </div>
  );
}

function canSaveDetails({
  metric,
  segment,
  segmentValue,
}: {
  metric: Option;
  segment: Option;
  segmentValue: Option;
}) {
  return Boolean(
    metric.label &&
      metric.value &&
      segment.label &&
      segment.value &&
      segmentValue.label &&
      segmentValue.value
  );
}
