import PropTypes from "prop-types";

import AddIcon from "@mui/icons-material/Add";
import {
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const AddUserListItemComponent = ({ route }) => (
  <ListItemButton
    component={Link}
    href={route}
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
