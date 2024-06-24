import { ReactNode, createContext, useState } from "react";

interface EntryField {
  id: string;
  name: string;
}

export interface Entry {
  metric: EntryField;
  segment: EntryField;
  segmentValue: EntryField;
  position: number;
  mode: "edit" | "view";
  published: boolean;
}

export const context = createContext<{
  data: Entry[];
  insertEntry: (index?: number) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (index: number) => void;
}>({
  data: [],
  insertEntry: () => {},
  updateEntry: () => {},
  deleteEntry: () => {},
});

export function Provider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [data, setData] = useState<Entry[]>([]);
  const { Provider } = context;

  const insertEntry = (index?: number) => {
    const position = index ?? data.length;
    setData([
      ...data.slice(0, position),
      {
        mode: "edit",
        position: position,
        metric: {
          id: "",
          name: "",
        },
        segment: {
          id: "",
          name: "",
        },
        segmentValue: {
          id: "",
          name: "",
        },
        published: false,
      },
      ...data.slice(position).map((entry) => {
        entry.position = entry.position + 1;
        return entry;
      }),
    ]);
  };

  const updateEntry = (entry: Entry) => {
    setData([
      ...data.slice(0, entry.position),
      entry,
      ...data.slice(entry.position + 1),
    ]);
  };

  const deleteEntry = (index: number) => {
    setData([
      ...data.slice(0, index),
      ...data.slice(index + 1).map((entry) => {
        entry.position = entry.position - 1;
        return entry;
      }),
    ]);
  };

  return (
    <Provider value={{ data, insertEntry, updateEntry, deleteEntry }}>
      {children}
    </Provider>
  );
}
