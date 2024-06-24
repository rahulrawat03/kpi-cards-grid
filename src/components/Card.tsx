import { CardEdit } from "./edit/CardEdit";
import { CardView } from "./view/CardView";
import { Entry } from "../context";

interface CardProps {
  entry: Entry;
}

export function Card({ entry }: Readonly<CardProps>) {
  if (entry.mode === "edit") {
    return <CardEdit entry={entry} />;
  }

  return <CardView entry={entry} />;
}
