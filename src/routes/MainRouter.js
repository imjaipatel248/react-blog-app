import { Route, Switch } from "react-router-dom";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import CreateBlogScreen from "../screens/Blogs/CreateBlogScreen";
import EditBlogScreen from "../screens/Blogs/EditBlogScreen";
import NavigationBar from "../screens/Components/NavigationBar";
import HomeScreen from "../screens/Home/HomeScreen";

const MainRouter = () => {
  return (
    <div>
      <NavigationBar/>
      <Switch>
        <Route exact path="/signup" component={SignUpScreen}></Route>
        <Route exact path="/signin" component={SignInScreen}></Route>
        <Route exact path="/" component={HomeScreen}></Route>
        <Route exact path="/tags/:tag" component={HomeScreen}></Route>
        <Route exact path="/add-blog" component={CreateBlogScreen}></Route>
        <Route exact path="/edit-blog/:id" component={EditBlogScreen}></Route>
      </Switch>
    </div>
  );
};
export default MainRouter;
