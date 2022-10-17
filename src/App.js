import AppWrapperComponent from "./components/AppWrapperComponent"

import { appRoutes } from "./settings/appConfig"

const App = () => (
  <AppWrapperComponent appRoutes={appRoutes}/>
);

export default App;
