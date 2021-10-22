import { useState } from "react";
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
import { Alert, CircularProgress, Grid, Snackbar } from "@mui/material";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectToSign, setRedirectToSign] = useState(false);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (password !== cPassword) {
      setError("Password and confirm password are not matching");
      setLoading(false);

      return;
    }
    await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        if (obj.success) {
          setRedirectToSign(true);
        } else {
          if (obj.email) setError(obj.email[0]);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  if (redirectToSign) {
    return <Redirect to={`/signIn`}></Redirect>;
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
        onClose={() => setError("")}
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              name="cpassword"
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
