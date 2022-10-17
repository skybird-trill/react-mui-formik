import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const StyledTypography = styled(({ children, ...props }) => (
  <Typography
    component="span"
    variant="body2"
    color="text.secondary"
    {...props}
  >
    {children}
  </Typography>
))({
  fontStyle: "italic",
});