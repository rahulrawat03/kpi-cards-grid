import { Grid } from "./components";
import { Provider } from "./context";

export function App() {
  return (
    <Provider>
      <Grid />
    </Provider>
  );
}
