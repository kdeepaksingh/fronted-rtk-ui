import { createTheme } from "@mui/material";
import colors from "./color";

const font = "'Open Sans'";

// 🔥 convert into function
export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode, // ✅ VERY IMPORTANT

      primary: {
        main: colors["ui-primary"],
      },
      secondary: {
        main: colors["ui-secondary"],
      },
      error: {
        main: colors["ui-error"],
      },
      warning: {
        main: colors["ui-warning"],
      },
      info: {
        main: colors["ui-info"],
      },
      success: {
        main: colors["ui-green-dark"],
      },

      // ✅ minimal safe dark support (no UI break)
      background: {
        default: mode === "dark" ? "#0f172a" : "#ffffff",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },

      text: {
        primary: mode === "dark" ? "#e5e7eb" : colors["ui-black"],
      },
    },

    typography: {
      fontFamily: font,
      fontSize: 14,
      body1: {
        lineHeight: 1,
        color: mode === "dark" ? "#e5e7eb" : colors["ui-black"],
      },
    },

    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: colors["ui-green-dark"],
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          root: {
            overflow: "visible",
            borderBottom: `1px solid`,
            borderColor: colors["ui-orange"],
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              fontWeight: "700",
              borderRadius: 4,
              textTransform: "uppercase",
            },
          },
        },
      },

      MuiInputBase: {
        defaultProps: {
          autoComplete: "off",
        },
        styleOverrides: {
          root: {
            fontSize: 14,
            "&.MuiInputBase-root": {
              // ✅ FIX: dynamic bg
              background: mode === "dark" ? "#334155" : "#fff",
              fieldset: {
                borderColor: colors["ui-blue"],
              },
            },
          },
        },
      },

      MuiInput: {
        defaultProps: {
          size: "small",
          autoComplete: "off",
        },
        styleOverrides: {
          root: {
            fieldset: {
              borderColor: colors["ui-brown-dark"],
            },
          },
        },
      },

      MuiTextField: {
        variants: [
          {
            props: { size: "small" },
            style: {
              "& .MuiInputBase-root": {
                fontSize: "14px",
                padding: "2px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiInputBase-input": {
                padding: "6.5px 10px",
              },
            },
          },
        ],
        defaultProps: {
          SelectProps: {
            MenuProps: {
              disablePortal: true,
            },
          },
        },
      },

      MuiSelect: {
        defaultProps: {
          size: "small",
          autoComplete: "off",
          MenuProps: {
            disablePortal: true,
          },
        },
        styleOverrides: {
          root: {
            fieldset: {
              borderColor: colors["ui-card-light"],
            },
            "&:hover": {
              fieldset: {
                borderColor: "#093F7C !important",
              },
            },
          },
        },
      },

      MuiCheckbox: {
        defaultProps: {
          size: "small",
        },
      },

      MuiTooltip: {
        styleOverrides: {
          popper: {
            "z-index": "2000 !important",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          className: "font-semibold uppercase",
          size: "small",
        },
        styleOverrides: {
          root: {
            minWidth: 40,
            fontWeight: 600,

            // ✅ dark-safe
            background: mode === "dark" ? "transparent" : undefined,

            "&.MuiButton-outlined:not([disabled])": {
              background: mode === "dark" ? "transparent" : "white",
              borderWidth: "1.5px",
            },

            "&.Mui-disabled": {
              boxShadow: "none",
              color: "rgba(0, 0, 0, 0.26) !important",
              backgroundColor: "transparent !important",
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: mode === "dark" ? "#1e293b" : "#fff",
            "&.MuiPaper-outlined": {
              borderColor: colors["ui-brown"],
            },
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          root: {
            "& .MuiPaper-root": {
              borderRadius: 10,
            },
          },
        },
      },

      MuiTable: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root:not(:last-child)": {
              borderColor: colors["ui-brown"],
              borderRight: `1px solid ${colors["ui-brown"]}`,
            },
            "& .MuiTableHead-root": {
              background:
                mode === "dark" ? "#334155" : colors["ui-brown-light"],
              th: {
                fontWeight: "600",
              },
            },
          },
        },
      },

      MuiLink: {
        styleOverrides: {
          root: {
            color: colors["ui-brown-light"],
          },
        },
      },

      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

// 🔥 optional fallback (for old usage)
export default getTheme("light");

// import { createTheme } from "@mui/material";
// import colors from "./color";

// const font = "'Open Sans'";

// const theme = createTheme({
//   typography: {
//     fontFamily: font,
//     fontSize: 14,
//     body1: { lineHeight: 1, color: colors["ui-black"] },
//   },
//   palette: {
//     primary: {
//       main: colors["ui-primary"],
//     },
//     secondary: {
//       main: colors["ui-secondary"],
//     },
//     error: {
//       main: colors["ui-error"],
//     },
//     warning: {
//       main: colors["ui-warning"],
//     },
//     info: {
//       main: colors["ui-info"],
//     },
//     success: {
//       main: colors["ui-green-dark"],
//     },
//   },
//   components: {
//     MuiFormLabel: {
//       styleOverrides: {
//         root: {
//           color: colors["ui-green-dark"],
//         },
//       },
//     },
//     MuiTabs: {
//       styleOverrides: {
//         root: {
//           overflow: "visible",
//           borderBottom: `1px solid`,
//           borderColor: colors["ui-orange"],
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           "&.Mui-selected": {
//             fontWeight: "700",
//             borderRadius: 4,
//             textTransform: "uppercase",
//           },
//         },
//       },
//     },
//     MuiInputBase: {
//       defaultProps: {
//         autoComplete: "off",
//       },
//       styleOverrides: {
//         root: {
//           fontSize: 14,
//           "&.MuiInputBase-root": {
//             background: "#fff",
//             fieldset: {
//               borderColor: colors["ui-blue"],
//             },
//             "&:focus": {
//               fieldset: {
//                 borderColor: colors["ui-blue"],
//               },
//             },
//           },
//         },
//       },
//     },
//     MuiInput: {
//       defaultProps: {
//         size: "small",
//         autoComplete: "off",
//       },
//       styleOverrides: {
//         root: {
//           fieldset: {
//             borderColor: colors["ui-brown-dark"],
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       variants: [
//         {
//           props: { size: "small" },
//           style: {
//             "& .MuiInputBase-root": {
//               fontSize: "14px",
//               padding: "2px",
//             },
//             "& .MuiInputLabel-root": {
//               fontSize: "14px",
//             },
//             "& .MuiInputBase-input": {
//               padding: "6.5px 10px",
//             },
//           },
//         },
//       ],
//       defaultProps: {
//         SelectProps: {
//           MenuProps: {
//             disablePortal: true,
//           },
//         },
//       },
//     },
//     MuiSelect: {
//       defaultProps: {
//         size: "small",
//         autoComplete: "off",
//         MenuProps: {
//           disablePortal: true,
//         },
//       },
//       styleOverrides: {
//         root: {
//           fieldset: {
//             borderColor: colors["ui-card-light"],
//           },
//           "&:hover": {
//             fieldset: {
//               borderColor: "#093F7C !important",
//             },
//           },
//         },
//       },
//     },
//     MuiCheckbox: {
//       defaultProps: {
//         size: "small",
//       },
//     },
//     MuiTooltip: {
//       defaultProps: {
//         // disablePortal: true,
//         // Disable portal for all Tooltips
//       },
//       styleOverrides: {
//         popper: {
//           "z-index": "2000 !important",
//         },
//       },
//     },
//     MuiButton: {
//       defaultProps: {
//         className: "font-semibold uppercase",
//         size: "small",
//       },
//       styleOverrides: {
//         root: {
//           minWidth: 40,
//           fontWeight: 600,
//           "&.MuiButton-outlined:not([disabled])": {
//             background: "white",
//             borderWidth: "1.5px",
//           },
//           "&.MuiButtonBase-root:not(.MuiButton-sizeSmall)": {
//             minHeight: 36,
//           },
//           "&.Mui-disabled": {
//             boxShadow: "none",
//             color: "rgba(0, 0, 0, 0.26) !important",
//             backgroundColor: "transparent !important",
//           },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           "&.MuiPaper-outlined": {
//             borderColor: colors["ui-brown"],
//           },
//         },
//       },
//     },
//     MuiDialog: {
//       defaultProps: {
//         // disablePortal: true,
//       },
//       styleOverrides: {
//         root: {
//           "& .MuiPaper-root": {
//             borderRadius: 10,
//           },
//         },
//       },
//     },
//     MuiTable: {
//       styleOverrides: {
//         root: {
//           "& .MuiTableCell-root:not(:last-child)": {
//             borderColor: colors["ui-brown"],
//             borderRight: `1px solid ${colors["ui-brown"]}`,
//           },
//           "& .MuiTableHead-root": {
//             background: colors["ui-brown-light"],
//             th: {
//               fontWeight: "600",
//             },
//           },
//         },
//       },
//     },
//     MuiLink: {
//       styleOverrides: {
//         root: {
//           color: colors["ui-brown-light"],
//         },
//       },
//     },
//     MuiAutocomplete: {
//       defaultProps: {
//         // No unsupported props here
//       },
//     },
//     MuiPopover: {
//       defaultProps: {
//         // No unsupported props here
//       },
//     },
//     MuiPopper: {
//       defaultProps: {
//         // No unsupported props here
//       },
//     },
//     MuiMenu: {
//       defaultProps: {
//         // No unsupported props here
//       },
//     },
//     MuiButtonBase: {
//       defaultProps: {
//         disableRipple: true,
//       },
//     },
//   },
// });

// export default theme;
