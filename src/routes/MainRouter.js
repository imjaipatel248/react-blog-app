import { Route, Switch } from "react-router-dom";
import SignIn from "../screens/Auth/SignInScreen";
import SignUp from "../screens/Auth/SignUpScreen";

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/" component={SignIn}></Route>

    </Switch>
  </div>
);
export default MainRouter;
