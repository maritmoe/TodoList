import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();

import Todos from "./FetchTodos";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Todos />
    </ThemeProvider>
  );
}

export default App;
