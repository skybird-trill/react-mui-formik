import { memo } from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { Container } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";


const AppRouter = ({ appRoutes }) => (
  <Switch>
    {appRoutes.map((item, index) => {
      const k = `route${index}`;

      return (
        <Route
          key={k}
          component={item.component}
          exact={item.exact}
          path={item.path}
        >
          {item.redirect && <Redirect to={item.redirect} />}
        </Route>
      );
    })}
  </Switch>
);

const appRouterShape = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  redirect: PropTypes.string,
  component: PropTypes.func,
};

AppRouter.propTypes = {
  appRoutes: PropTypes.arrayOf(PropTypes.shape(appRouterShape)).isRequired,
};

const AppWrapperComponent = ({ appRoutes }) => {
  const theme = useTheme();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Container sx={{ mt: 3 }}>
            <AppRouter appRoutes={appRoutes} />
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
};

export default memo(AppWrapperComponent);

AppWrapperComponent.propTypes = {
  appRoutes: PropTypes.arrayOf(PropTypes.shape(appRouterShape)).isRequired,
};
