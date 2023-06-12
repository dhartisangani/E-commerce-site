import { createTheme } from "@material-ui/core/styles";
import { colors } from "@mui/material";

interface CustomPalette {
  type: "light" | "dark";
  primary: {
    main: string;
    light: string;
    dark: string;
    background: string;
  };
  secondary: {
    main: string;
    background: string;
  };
  error: {
    main: string;
  };
  background: {
    default: string;
    // paper: string;
  };
  text?: {
    primary: string;
    secondary: string;
  };
}

export const lightPalette: CustomPalette = {
  type: "light",
  primary: {
    main: "#3f51b5",
    dark:'#2b377b',
    light: "#cbe4fe ",
    background: "#f5f5f5",
  },
  secondary: {
    main: "#FFBF00",
    background: "#f5f5f5",
  },
  error: {
    main: colors.red.A400,
  },
  background: {
    default: "#f5f5f5",
    // paper: "#a0a0a0",
  },
  text: {
    primary: "#000",
    secondary: "#a0a0a0",
  },
};

export const darkPalette: CustomPalette = {
  type: "dark",
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#e3f2fd",
    background: "#1c1b1b",
  },
  secondary: {
    main: "#ffffff",
    background: "#1c1b1b",
  },
  error: {
    main: colors.red.A400,
  },
  background: {
    default: "#1c1b1b",
    // paper: "#D3D3D3",
  },
  text: {
    primary: "#ffffff",
    secondary: "#a0a0a0",
  },
};

const theme = createTheme({
  palette: lightPalette.type === "light" ? lightPalette : darkPalette,
});

export default theme;
