// color design tokens export
export const tokensDark = {
    grey: {
      0: "#ffffff", // manually adjusted
      10: "#f6f6f6", // manually adjusted
      50: "#f0f0f0", // manually adjusted
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
      1000: "#000000", // manually adjusted
    },
    primary: {
      // blue
      100: "#d3d4de",
      200: "#a6a9be",
      300: "#7a7f9d",
      400: "#4d547d",
      500: "#21295c",
      600: "#191F45", // manually adjusted
      700: "#141937",
      800: "#0d1025",
      900: "#070812",
    },
    secondary: {
      // yellow
      50: "#f0f0f0", // manually adjusted
      100: "#fff6e0",
      200: "#ffedc2",
      300: "#ffe3a3",
      400: "#ffda85",
      500: "#ffd166",
      600: "#cca752",
      700: "#997d3d",
      800: "#665429",
      900: "#332a14",
    },
  };
  
  // function that reverses the color palette
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.primary[600],
                alt: tokensDark.primary[500],
              },
            }
          : {
              primary: {
                ...tokensLight.primary,
                main: tokensLight.primary[400],
                light: tokensLight.primary[300],
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensLight.secondary[300],
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensLight.grey[500],
              },
              background: {
                default: tokensLight.grey[0],
                alt: tokensLight.grey[10],
              },
            }),
      },
      components: {
        MuiSelect: {
          styleOverrides: {
            root: {
              color: mode === 'dark' ? tokensDark.grey[0] : tokensLight.grey[900],
              backgroundColor: mode === 'dark' ? tokensDark.grey[800] : tokensLight.grey[100],
            },
            icon: {
              color: mode === 'dark' ? tokensDark.grey[0] : tokensLight.grey[900],
            },
          },
        },
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  