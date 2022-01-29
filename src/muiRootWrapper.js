import React from "react"

import { Provider } from "react-redux"
import store from "./redux/store"

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';



// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#343a40",
      light: "#484848",
      dark: "#191919",
    },
    secondary: {
      main: "#f44336",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#fff",
    },
  },
})

export default ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
      </ThemeProvider>
    </Provider>
  )
}
