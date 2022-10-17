import Typography from "@mui/material/Typography";
import { svgIconClasses } from "@mui/material";

import { styled } from "@mui/system";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  [`.${svgIconClasses.root}`]: {
    marginLeft: theme.spacing(0.5),
  },
}));
