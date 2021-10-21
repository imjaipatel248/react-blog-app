import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { Redirect } from "react-router";
import { isAuthenticated } from "../../Helpers/UserHelper";
import BlogFromComponent from "./BlogFromComponent";

const theme = createTheme();

export default function CreateBlogScreen() {

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (data) => {
    console.log(handleSubmit);
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API_URL}/blog/create-blog`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: isAuthenticated(),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status) {
          setRedirect(true);
          setLoading(false);
        }
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  if (!isAuthenticated()) {
    return <Redirect to="signin" />;
  }
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BlogFromComponent
        handleSubmit={(data)=>handleSubmit(data)}
        buttonName="add blog"
        formTitle={"Add Blog"}
        blog={{}}
      />
    </ThemeProvider>
  );
}
