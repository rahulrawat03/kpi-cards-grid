import { MouseEvent as ReactMouseEvent, useContext } from "react";
import { Plus } from "react-feather";
import { context } from "../../context";

interface AddMoreProps {
  position: number;
}

export function AddMore({ position }: AddMoreProps) {
  const { insertEntry } = useContext(context);

  const handleClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    insertEntry(position);
  };

  return (
    <div className="group flex items-center">
      <button
        className="w-6 h-6 p-1 flex justify-center items-center rounded-full outline-none bg-on-primary invisible group-hover:visible "
        onClick={handleClick}
      >
        <Plus className="text-white" />
      </button>
    </div>
  );
}
