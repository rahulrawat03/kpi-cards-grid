import { ArrowUp, Triangle } from "react-feather";

interface CardDataProps {
  data: number[];
}

export function CardData({ data }: CardDataProps) {
  const total = data.reduce((acc, value) => acc + value, 0);
  const formattedTotal = formatValue(total);
  const lastSevenDaysTotal = data
    .slice(0, 7)
    .reduce((acc, value) => acc + value, 0);

  // Multiple by 1000 first and then divide by 10
  // to round the value to 1 fractional point
  const percentageIncrease = ((lastSevenDaysTotal * 100) / total).toFixed(1);

  return (
    <div className="flex flex-col items-bottom mb-4 grow-0">
      <strong className="text-on-background text-lg xs:text-xl font-semibold mb-2">
        {formattedTotal}
      </strong>
      <div className="flex flex-col xs:flex-row xs:items-center">
        <div className="flex">
          <ArrowUp size={20} className="text-on-primary" />
          <strong className="text-on-backgrouhnd text-xs xs:text-sm font-normal">
            {percentageIncrease}%
          </strong>
        </div>
        <div className="flex">
          <Triangle className="text-grey xs:ml-2" size={16} />
          <p className="text-grey text-xs xs:text-sm">7d</p>
        </div>
      </div>
    </div>
  );
}

function formatValue(value: number): string {
  const stringValue = value.toString();

  if (stringValue.length <= 3) {
    return stringValue;
  }

  if (stringValue.length <= 6) {
    return `${(value / 1e3).toFixed(1)}K`;
  }

  if (stringValue.length <= 9) {
    return `${(value / 1e6).toFixed(1)}M`;
  }

  return `${(value / 1e3).toFixed(1)}B`;
}
