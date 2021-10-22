import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, CircularProgress, Grid, Link, Snackbar } from "@mui/material";
import { Redirect } from "react-router";
import { isAuthenticated } from "../../Helpers/UserHelper";

const theme = createTheme();

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectToSign, setRedirectToSign] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        if (obj.success) {
          localStorage.setItem("jwt", obj.jwt);
          localStorage.setItem("user_id", obj.user_id);
          setRedirectToSign(true);
        } else {
          setError(obj.detail);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  if (isAuthenticated() || redirectToSign) {
    return <Redirect to={`/`}></Redirect>;
  }
  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
