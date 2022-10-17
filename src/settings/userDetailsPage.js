import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import ReplyIcon from "@mui/icons-material/Reply";

import API_URL from "../constants/api";
import routeNames from "../constants/routeNames";

export const resourceUrl = `${API_URL}/users/`;

export const mainRoute = routeNames.Main;

export const getTitle = resourceId => resourceId ? "Edit user" : "Add user";

export const getActions = resourceId => [{
  title: resourceId ? "Save" : "Add",
  type: "submit",
  startIcon: resourceId ? <CreateIcon /> : <AddIcon />,
  loadingPosition: "start",
}, {
  title: resourceId ? "Back" : "Cancel",
  component: Link,
  to: routeNames.Main,
  variant: "text",
  startIcon: <ReplyIcon />,
}];
