import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/loadgin/LoadingSpinner";
import router from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import SocketContextProvider from "./context/useSocketContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008080",
      dark: "#004C4C",
    },
    secondary: {
      main: "#FF7F00",
    },
    success: {
      main: "#FF8C00",
    },
    info: {
      main: "#0A3D62",
    },
    warning: {
      main: "#FFD580",
    },
    custom: {
      xmas: "#003049",
    },
  },
});

function App() {
  const { checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <SocketContextProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <Toaster />
      </ThemeProvider>
    </SocketContextProvider>
  );
}

export default App;
