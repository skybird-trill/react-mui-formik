import AppWrapperComponent from "./components/AppWrapperComponent"

import { appRoutes } from "./settings/appConfig"

const App = () => (
  <AppWrapperComponent
    appRoutes={appRoutes}
    basename={process.env.PUBLIC_URL}
  />
);

export default App;
