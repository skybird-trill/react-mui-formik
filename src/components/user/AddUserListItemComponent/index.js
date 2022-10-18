import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import AddIcon from "@mui/icons-material/Add";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const AddUserListItemComponent = ({ route }) => (
  <ListItemButton
    component={NavLink}
    to={route}
  >
    <ListItemIcon>
      <AddIcon />
    </ListItemIcon>
    <ListItemText
      primary="Add user"
    />
  </ListItemButton>
);

export default AddUserListItemComponent;

AddUserListItemComponent.defaultProps = {
  route: "",
};

AddUserListItemComponent.propTypes = {
  route: PropTypes.string,
};
