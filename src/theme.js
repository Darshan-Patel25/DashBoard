// color design tokens export
export const tokensDark = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#E3ECF9",
    100: "#BDC3C7",
    200: "#A3A9AC",
    300: "#8C9499",
    400: "#767E84",
    500: "#5F666B",
    600: "#484E52",
    700: "#1D2A39", // Basic Background
    800: "#172A35", // Sidebar Background
    900: "#1A2026", // Main Background
    1000: "#000000",
  },
  primary: {
    50: "#E6F0FF",
    100: "#CCE1FF",
    200: "#99C3FF",
    300: "#66A5FF",
    400: "#5593D7", // Link Text
    500: "#0061F2", // Primary Button
    600: "#0B61B2", // Secondary Button
    700: "#004CBD",
    800: "#003C99",
    900: "#002B75",
  },
  secondary: {
    50: "#F9FAFB",
    100: "#F4F6F8",
    200: "#E9ECF1",
    300: "#BDC3C7", // Secondary Text Light
    400: "#7F8C8D", // Secondary Text Dark
    500: "#2C3E50", // Primary Text Light
    600: "#2A3B52", // Footer
    700: "#1D2A39",
    800: "#172A35",
    900: "#1A2026",
  },
  success: {
    100: "#E6F4EA",
    200: "#C6E5D0",
    300: "#96D0AA",
    400: "#66BB84",
    500: "#2BA745", // Alert/CTA (Green)
    600: "#238C37",
    700: "#1B7029",
    800: "#14531C",
    900: "#0C370E",
  },
  error: {
    100: "#FFE8E3",
    200: "#FFC7BA",
    300: "#FFA691",
    400: "#FF8568",
    500: "#FF5733", // Alert/CTA (Red)
    600: "#CC4629",
    700: "#99341F",
    800: "#662315",
    900: "#33110A",
  },
};

export const tokensLight = {
  grey: {
    0: "#FFFFFF",
    10: "#F8FAFC",
    50: "#e8f1ff", // Main Background
    100: "#f0f6ff", // Basic Background - Sidebar
    200: "#a8b8d8", // Light blue-gray
    300: "#777777", // Secondary Text
    400: "#5d6b89", // Mid blue-gray
    500: "#456EC8", // Primary Text
    600: "#2e3b59", // Footer
    700: "#1a2236",
    800: "#141a2b",
    900: "#0d1117",
    1000: "#000000",
  },

  primary: {
    50: "#f0f7ff",
    100: "#e0f0ff",
    200: "#c1ddff",
    300: "#97c3ff",
    400: "#2378c3", // Link Text
    500: "#4A88C2", // Primary Button
    600: "#397cc0", // Primary Button Hover
    700: "#2e69a3",
    800: "#245182",
    900: "#1a3c61",
  },
  secondary: {
    50: "#f5f7fa",
    100: "#456EC8",
    200: "#a8b8d8", // Secondary Button
    300: "#8faedb", // Secondary Button Hover
    400: "#777777", // Secondary Text
    500: "#456EC8", // Primary Text
    600: "#2e3b59", // Footer
    700: "#1a2236",
    800: "#141a2b",
    900: "#0d1117",
  },
  success: {
    100: "#e8f7ed",
    200: "#c6ebd1",
    300: "#93d8aa",
    400: "#4fc575",
    500: "#2ba745", // Success Green
    600: "#208b37",
    700: "#1a703c",
    800: "#155831",
    900: "#0f3d22",
  },
  error: {
    100: "#fee7e7",
    200: "#fcc5c5",
    300: "#f89494",
    400: "#f45757",
    500: "#e42020", // Error Red
    600: "#c11414",
    700: "#9f1212",
    800: "#7a0e0e",
    900: "#540909",
  },
  accent: {
    100: "#fff4e6",
    200: "#ffe4c4",
    300: "#ffd199",
    400: "#ffba61",
    500: "#ff9f24", // Accent Orange
    600: "#f78500",
    700: "#cc6d00",
    800: "#a35600",
    900: "#733d00",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[500],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[400],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[900], // Main Background
              paper: tokensDark.grey[700], // Basic Background
              alt: tokensDark.grey[800], // Sidebar Background
            },
            text: {
              primary: "#FFFFFF", // Primary Text
              secondary: tokensDark.grey[100], // Secondary Text
              link: tokensDark.primary[400], // Link Text
            },
            error: {
              main: tokensDark.error[500],
              light: tokensDark.error[400],
            },
            success: {
              main: tokensDark.success[500],
              light: tokensDark.success[400],
            },
            divider: tokensDark.grey[800],
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: tokensLight.primary[500],
              light: tokensLight.primary[400],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensLight.secondary[200], // Secondary Button color
              light: tokensLight.secondary[300], // Secondary Button Hover
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[500],
            },
            background: {
              default: tokensLight.grey[50], // Main Background #e8f1ff
              paper: tokensLight.grey[0], // White
              alt: tokensLight.grey[100], // Sidebar Background #c1d7f7
            },
            text: {
              primary: tokensLight.grey[500], // Primary Text #2d2d2d
              secondary: tokensLight.grey[300], // Secondary Text #777777
              link: tokensLight.primary[400], // Link Text #2378c3
            },
            error: {
              main: tokensLight.error[500],
              light: tokensLight.error[400],
            },
            success: {
              main: tokensLight.success[500],
              light: tokensLight.success[400],
            },
            accent: {
              main: tokensLight.accent[500],
              light: tokensLight.accent[400],
            },
            divider: tokensLight.grey[200],
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 600,
        color: mode === "dark" ? "#FFFFFF" : tokensLight.secondary[500],
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600,
        color: mode === "dark" ? "#FFFFFF" : tokensLight.secondary[500],
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 500,
        color: mode === "dark" ? "#FFFFFF" : tokensLight.secondary[500],
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
        color: mode === "dark" ? "#FFFFFF" : tokensLight.secondary[500],
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 400,
        color: mode === "dark" ? "#FFFFFF" : tokensLight.secondary[500],
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 400,
        color: mode === "dark" ? "#FFFFFF" : tokensLight.secondary[500],
      },
      body1: {
        fontSize: 14,
        color:
          mode === "dark" ? tokensDark.grey[100] : tokensLight.secondary[300],
      },
      body2: {
        fontSize: 12,
        color:
          mode === "dark" ? tokensDark.grey[100] : tokensLight.secondary[300],
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color:
              mode === "dark"
                ? tokensDark.primary[400]
                : tokensLight.primary[400],
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? tokensLight.primary[600] // Primary Button Hover #397cc0
                  : undefined, // Keep dark theme hover unchanged
            },
          },
          containedSecondary: {
            backgroundColor:
              mode === "light"
                ? tokensLight.secondary[200] // Secondary Button #a8b8d8
                : undefined,
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? tokensLight.secondary[300] // Secondary Button Hover #8faedb
                  : undefined,
            },
          },
        },
      },
    },
  };
};
