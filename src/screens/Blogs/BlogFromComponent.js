import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TagsInput from "../Components/TagInputComponent";
import MDEditor from '@uiw/react-md-editor';
import { Alert, CircularProgress, Grid, Link, Snackbar } from "@mui/material";

export default function BlogFromComponent({ ...props }) {
  const { buttonName, handleSubmit, formTitle, blog } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [chipTags, setChipTags] = useState([]);
  const [error, setError] = useState("");

  const handleSelecetedTags = (items) => {
    setChipTags(items);
  };
  const onClickSubmitButton = () => {
    if(!title.length)
    {
      setError("Title may not be blank.");
      return;
    }
    if(!body.length)
    {
      setError("Body may not be blank.");
      return;
    }
    if(!chipTags.length)
    {
      setError("Tags may not be blank.");
      return;
    }
    const data = {
      title,
      body,
      tags: chipTags.toString() + ",",
    };
    handleSubmit(data);
  };
  useEffect(() => {
if(blog.title){
    setTitle(blog.title);
    setBody(blog.body);
    const arr=blog.tags.split(",")
    arr.splice(-1)
    setTags(arr);
}
  }, [blog]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error.length}
        autoHideDuration={6000}
        onClose={()=>setError("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
        {error}
        </Alert>
      </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {formTitle}{" "}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              name="title"
              type="title"
              autoComplete="title"
              autoFocus
            />
    <MDEditor
        value={body}
        onChange={setBody}
      />

            <TagsInput
              margin="normal"
              fullWidth
              value={title}
              variant="outlined"
              label="Tags"
              type="input"
              autoComplete="title"
              autoFocus
              tags={tags}
              selectedTags={handleSelecetedTags}
              id="tags"
              name="tags"
            />
            <Button
              type="button"
              onClick={onClickSubmitButton}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {buttonName}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
