import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignUpSubmit } from '../../services/usercrud';
import { useNavigate } from "react-router-dom";




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();



export default function SignUp() {
  const navigate = useNavigate();
  const handleSignUp = (event) => {
    event.preventDefault();
    const newUserData = new FormData(event.currentTarget);
    SignUpSubmit(newUserData)
    .then((res) => navigate("/"))
    .catch((err) => alert(err.response))
    }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#D98695' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  color="secondary"
                  autoFocus
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
        
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de Email"
                  name="email"
                  autoComplete="email"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="interests"
                  label="interesses/Hobbies"
                  name="interests"
                  autoComplete="interests"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="term"
                  label="Período"
                  name="term"
                  autoComplete="term"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="subjects"
                  label="Matérias"
                  name="subjects"
                  autoComplete="subjects"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, bgcolor: '#D98695' }}
            >
              Cadastre
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2"  color= "#000000">
                  Já tem uma conta? Faça Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}