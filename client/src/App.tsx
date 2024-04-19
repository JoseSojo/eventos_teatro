import { Route, Switch } from "wouter"
import LoginTemplate from "./UI/templates/LoginTemplate"
import { useAuth } from "./context/AuthContext"
import ProfileTemplate from "./UI/templates/ProfileTemplate";
import DashboardTemplate from "./UI/templates/DashboardTemplate";
import LogoutTemplate from "./UI/templates/LogoutTemplate";
import Notification from "./UI/organims/Notification";
import UserTemplate from "./UI/templates/UserTemplate";

function App() {

  const auth = useAuth();

  return (
    <>
      <Notification />
      <Switch>
        { !auth.session && <Route path="/" component={LoginTemplate} /> }
        <Route path="/profile" component={ProfileTemplate} />
        <Route path="/logout" component={LogoutTemplate} />
        <Route path="/dashboard" component={DashboardTemplate} />
        <Route path="/users" component={UserTemplate} />
        <Route path="/" component={auth.session ? DashboardTemplate : LoginTemplate} />    
      </Switch>
    </>
  )
}

export default App
