import { styled } from "@mui/system";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledFormHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

export const StyledTextExplanations = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledFormFooter = styled("div")(({
  theme,
  columns,
  rows,
  align,
}) => ({
  position: "relative",
  gap: `${theme.spacing(1)}`,

  "&&.formFooterFlex": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: align,
    minWidth: align === "justify" ? "100%" : "",
  },

  "&&.formFooterGrid": {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    minWidth: align === "justify" ? "100%" : "auto",
    justifyContent: align === "justify" ? "stretch" : align,
    justifyItems: "stretch",
  },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ align }) => ({
  flex: align === "justify" ? "1 0 auto" : "",
}));

export const StyledFormBody = props => (
  <Stack position="relative" spacing={2} {...props} />
);
