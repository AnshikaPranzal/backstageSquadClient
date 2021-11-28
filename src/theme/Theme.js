// import { createTheme } from '@mui/material/styles';

import { createMuiTheme } from "@mui/material";

const arcBlue= "#d3d3d3"  //0B72B9  F5B1AC  5fdde5 b2f7ef
const arcYellow= "#222222" //FFBA60 f4ea8e b2967d
const arcPink= "#F7B2B7"

const theme = createMuiTheme({
  palette: {
    common:{
        blue: "#d3d3d3",
        yellow: `${arcYellow}`
    },
    primary: {
        main: `${arcBlue}`
    },
    secondary: {
        main: `${arcYellow}`,
        light: `${arcPink}`
    }
  },
  typography: {
      tab: {
        textTransform: "none",
        fontWeight: "700",
        fontSize: "1rem"
      },
      h1:{
        fontSize:"4rem"
      },
      h2:{
        color: `${arcBlue}`,
        fontWeight: "400",
        fontSize: "3rem"
      },

      h4:{
        color: `${arcYellow}`,
        fontWeight: "500",
        fontSize: "2rem",
        letterSpacing:"-1px"
      }
  },
  

  overrides: {
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: "1rem"
      }
    },
    MuiContainer: {
      root:{
        paddingLeft:"0px !important",
        paddingRight:"0px !important"
      }
    },
    MuiInput:{
      // underline:{
      //   "&:before":{
      //     borderBottom: `2px solid ${arcBlue}`
      //   }
      // }
    }
  }
});

export default theme;