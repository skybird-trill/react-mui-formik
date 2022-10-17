import PropTypes from "prop-types";

import {
  Link,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { StyledTypography } from "./style";

const UserMainInfo = ({
  name,
  username,
  email,
}) => (
  <>
    {`${username} (${name})`}
    <StyledTypography>
      {" "}— {email}
    </StyledTypography>
  </>
);

const UserListItemComponent = ({
  userData,
  route,
}) => {

  const {
    id,
    name,
    username,
    email,
    company,
  } = userData;

  return (
    <ListItemButton
      component={Link}
      href={route.replace(":id", id)}
    >
      <ListItemAvatar>
        {id}.
      </ListItemAvatar>
      <ListItemText
        primary={<UserMainInfo name={name} username={username} email={email}/>}
        secondary={[company?.name, company?.bs].join(" / ")}
      />
    </ListItemButton>
  );
};

export default UserListItemComponent;

UserListItemComponent.defaultProps = {
  userData: {},
  route: "",
};

UserListItemComponent.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.shape({}),
  }),
  route: PropTypes.string,
};
