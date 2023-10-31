import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call'
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import InterestsIcon from '@mui/icons-material/Interests';
import SchoolIcon from '@mui/icons-material/School';
import { LoginID, LogoutSubmit } from '../../services/usercrud';
import { getUser } from '../../services/usercrud';
import {
  forgetUser
} from '../../services/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext, User } from '../../services/AuthContext';
import ImagePickModal from '../../components/ImagePickModal/ImagePickModal';
import DefaultUser from '../../assets/DefaultUser.png';
import * as React from 'react';


import {
  DataContainer,
  DataAlign,
  Value,
  Label,
  Divider,
  PictureNameContainer,
  UserNameText,
  Avatar
} from "./Styles"
import { useEffect } from 'react';

const theme = createTheme();

export default function Perfil() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    interesses: "",
    periodo: 0,
    materias: "",
  })

  const [imageUrl, setImageUrl] = React.useState('');

  const [openImageUrlModal, setOpenImageUrlModal] = React.useState(false);
  const handleOpenImageUrlModal = () => setOpenImageUrlModal(true);

  const handleCloseImageUrlModal = (url) => {
    setImageUrl(url);
    setOpenImageUrlModal(false);
  }

  useEffect(() => {
    setTimeout(() =>
      LoginID().then(res => setUserData(res))
      , 500)
  }, [userData])

  const handleLogout = (jwtIsSet = true) => {
    if (jwtIsSet)
      LogoutSubmit()
    forgetUser()
    navigate("/")
      .catch((err) => alert(err.response))
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <Grid container spacing={80}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#D98695'  }}
              onClick={() => navigate("/listagem")}
              color="secondary"
            >
              Tarefas
            </Button>
          </Grid>
        </Grid>
        <Container maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: "100%",
                height: "200%",
              },
            }}
          >
            <Paper>
              <Divider style={{
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#efc2c9',
              }}
              >
                <PictureNameContainer>
                <Avatar src={imageUrl ? imageUrl : DefaultUser}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      setImageUrl("");
                      currentTarget.src = DefaultUser;
                    }}
                    alt="foto de perfil"
                  />
                  <Button
                    variant="outlined"
                    style={{
                      textTransform: 'none',
                      width: '100%',
                      fontWeight: 600,
                      borderRadius: 10,
                      height: 44,
                      fontSize: 18,
                      color: 'var(--app-rosa)',
                      margin: 10,
                      borderBlockColor: 'var(--app-rosa)',
                      borderColor: 'var(--app-rosa)'
                    }}
                    onClick={handleOpenImageUrlModal}
                  >Alterar foto</Button>
                  <ImagePickModal
                    title="Insira a URL da Imagem"
                    content="CONTEUDO"
                    openImageUrlModal={openImageUrlModal}
                    handleCloseImageUrlModal={handleCloseImageUrlModal}
                  />
                  <UserNameText>
                    {userData.name}
                  </UserNameText>
                </PictureNameContainer>
                <DataContainer>
                  <DataAlign>
                    <MailIcon />
                    <Label> Email: </Label>
                    <Value> {userData.email} </Value>
                  </DataAlign>
                  <DataAlign>
                    <InterestsIcon />
                    <Label> Interesses/Hobbies: </Label>
                    <Value> {userData.interesses} </Value>
                  </DataAlign>
                  <DataAlign>
                    <SchoolIcon />
                    <Label> Período: </Label>
                    <Value> {userData.periodo} </Value>
                  </DataAlign>
                  <DataAlign>
                    <BookIcon />
                    <Label> Matérias: </Label>
                    <Value> {userData.materias} </Value>
                  </DataAlign>
                </DataContainer>
              </Divider>
            </Paper>
          </Box>
          
        </Container>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 0, bgcolor: '#D98695', width: 500 }}
                onClick={() => handleLogout(true)}
                color="secondary"
              >
                Logout
              </Button>
      </Container>
    </ThemeProvider>
  );
}