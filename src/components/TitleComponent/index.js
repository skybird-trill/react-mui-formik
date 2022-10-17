import PropTypes from "prop-types";

import Tooltip from "@mui/material/Tooltip";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { StyledTypography } from "./style";

const TitleComponent = ({ title, titleTooltip }) => (
  <StyledTypography variant="h5" className="title">
    {title}
    {titleTooltip && (
      <Tooltip
        placement="right"
        fontSize="medium"
        title={titleTooltip}
      >
        <HelpOutlineIcon color="primary" />
      </Tooltip>
    )}
  </StyledTypography>
);

export default TitleComponent;

TitleComponent.defaultProps = {
  title: "",
  titleTooltip: "",
};

TitleComponent.propTypes = {
  title: PropTypes.string,
  titleTooltip: PropTypes.string,
};
