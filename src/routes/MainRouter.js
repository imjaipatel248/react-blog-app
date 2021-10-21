import { Route, Switch } from "react-router-dom";
import SignIn from "../screens/Auth/SignInScreen";
import SignUp from "../screens/Auth/SignUpScreen";
import CreateBlogScreen from "../screens/Blogs/CreateBlogScreen";
import EditBlogScreen from "../screens/Blogs/EditBlogScreen";
import NavigationBar from "../screens/Components/NavigationBar";
import Home from "../screens/Home/HomeScreen";

const MainRouter = () => (
  <div>
    <NavigationBar />
    <Switch>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/home/:tag" component={Home}></Route>
      <Route exact path="/add-blog" component={CreateBlogScreen}></Route>
      <Route exact path="/edit-blog/:id" component={EditBlogScreen}></Route>

    </Switch>
  </div>
);
export default MainRouter;
