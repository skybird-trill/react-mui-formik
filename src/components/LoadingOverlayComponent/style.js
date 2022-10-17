import {
  Box,
  CircularProgress,
  alpha,
} from "@mui/material";
import { styled } from "@mui/system";

export const StyledOverlay = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  background: alpha(theme.palette.background.default, 0.75),
  zIndex: theme.zIndex.drawer,
}));

export const StyledProgress = styled(CircularProgress)({
  margin: "auto",
});
