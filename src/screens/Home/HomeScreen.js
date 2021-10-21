import { Backdrop, CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../Helpers/UserHelper";
import ListBlogScreen from "../Blogs/ListBlogScreen";

export default function Home(props) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
     const tag=props.match.params.tag ? '/'+ props.match.params.tag : '';
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}/blog/list-blog${tag}`, {
      method: "GET",
      headers: { "Content-type": "application/json"        
      ,Authorization: isAuthenticated(),
    },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.status) {
          setBlogs(res.data);
        }
      })
      .catch((err) => console.log(err));
      setLoading(false)
  }, [props.match.params]);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container fixed maxWidth="sm">
        <Box sx={{ mt: 3 }}>
          <ListBlogScreen blogs={blogs} />
        </Box>
      </Container>
    </div>
  );
}
