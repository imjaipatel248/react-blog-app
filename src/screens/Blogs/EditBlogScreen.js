import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { Redirect } from "react-router";
import { isAuthenticated } from "../../Helpers/UserHelper";
import BlogFromComponent from "./BlogFromComponent";

const theme = createTheme();

export default function EditBlogScreen(props) {

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [blog, setBlog] = useState({});
  const [editId, setId] = useState('');
  useEffect(() => {
    setId(props.match.params.id)

  },[])
  useEffect(() => {
    const id=props.match.params.id ? '/'+ props.match.params.id : '';

    setId(id)
   setLoading(true)
   fetch(`${process.env.REACT_APP_API_URL}/blog/get-blog${id}`, {
     method: "GET",
     headers: { "Content-type": "application/json", 'Authorization':isAuthenticated()},
   })
     .then((response) => {
       return response.json();
     })
     .then((res) => {
       if (res.status) {
         setBlog(res.data);
        if(res.data.author_id!=localStorage.getItem('user_id'))
        {
         setRedirect('/');
        }
       }
     })
     .catch((err) => console.log(err));
     setLoading(false)
 }, [props.match.params]);
  const handleSubmit = async (data) => {
    console.log(handleSubmit);
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API_URL}/blog/edit-blog${editId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: isAuthenticated(),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status) {
          setRedirect('/');
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
    return <Redirect to={redirect} />;
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
        buttonName="edit blog"
        formTitle={"Edit Blog"}
        blog={blog}
      />
    </ThemeProvider>
  );
}
