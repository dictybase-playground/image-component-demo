import React from "react"
import ReactDOM from "react-dom"
import { createTheme, ThemeProvider } from "@material-ui/core"
import App from "./AppVersion1"
import "@fontsource/fira-code"
import "./index.css"

const theme = createTheme({
  typography: {
    fontFamily: ["Fira Code", "monospace"].join(","),
  },
  palette: {
    primary: { main: "#2979ff" },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector("#root") as HTMLElement,
)
