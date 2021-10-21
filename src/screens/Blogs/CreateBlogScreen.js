import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { Redirect } from 'react-router';
import TagsInput from '../Components/TagInputComponent';
import { isAuthenticated } from '../../Helpers/UserHelper';

const theme = createTheme();

export default function SignIn() {
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [tags,setTags]=useState([]);
  const [chipTags,setChipTags]=useState([]);
  const [loading,setLoading]=useState(false)
  const [redirectToSign,setRedirectToSign]=useState(false)
  const handleSubmit =async (event) => {
    setLoading(true);
    event.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/blog/create-blog`, {
        method: "POST",
        headers:{'Content-type':'application/json','Authorization':isAuthenticated()},
        body:JSON.stringify({
          title,
          body,
          tags:chipTags.toString()
        })
      })
        .then((response) => {
          if(response.status)
          {
            setRedirectToSign(true);
            setLoading(false);
          }
          return response.json();
        })
        .catch((err) => console.log(err));

  };
  const handleSelecetedTags=(items)=> {
    setChipTags(items);
  }
  if(!isAuthenticated())
  {
      return <Redirect to="signin"/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Blog
          </Typography>
          <Box component="form"  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              label="Title"
              name="title"
              type="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="body"
              value={body}
              onChange={(e)=>setBody(e.target.value)}
              label="Body"
              name="body"
              type="body"
              autoComplete="body"
              autoFocus
              multiline
              rows={4}
            />
          
            <TagsInput
            margin="normal"
            fullWidth
            value={title}
            variant="outlined"
            label="Title"
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
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Blog
            </Button>
          </Box>
        </Box>
      </Container>

    </ThemeProvider>
  );
}