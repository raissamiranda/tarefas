import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { TarefaSignUp } from '../../services/usercrud';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { getAllUsers, UserChip } from '../../services/usercrud';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { makeStyles } from "@mui/styles";
import { pink } from '@mui/material/colors'

import {
  Divider,
  DataContainer,
  DataAlign,
  Value,
  Label,
  ButtonAlign,
  ProjectCreateForm
} from "./Styles"


import {
  Container,
  Toolbar,
  Box,
  Paper,
  Button,
  TextField,
  Chip,
  MenuItem
} from '@mui/material';

const theme = createTheme();


export default function ProjectRegister() {
  const navigate = useNavigate();

  const handleProjectCreate = (event) => {
    event.preventDefault();

    const newProjectData = new FormData(event.currentTarget);

    const body = {
      name: newProjectData.get("name"),
      deadline: newProjectData.get("deadline"),
      subject: newProjectData.get("subject"),
      value: newProjectData.get("value"),
      activity: newProjectData.get("activity"),
    }

    TarefaSignUp(body).then((res) => navigate("/listagem"))
      .catch((err) => console.log(err.response))
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
            marginBottom: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#D98695' }}>
            <TaskAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Nova Tarefa
          </Typography>
          <Box component="form" noValidate onSubmit={handleProjectCreate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome da Tarefa"
                  autoFocus
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="deadline"
                  label="Prazo de Entrega"
                  name="deadline"
                  autoComplete="deadline"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="subject"
                  label="Matéria"
                  name="subject"
                  autoComplete="subject"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="value"
                  label="Pontuação"
                  name="value"
                  autoComplete="value"
                  color="secondary"
                  sx={{borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="activity"
                  label="Tipo de Atividade"
                  name="activity"
                  autoComplete="activity"
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
              sx={{ mt: 3, mb: 2, bgcolor: '#D98695', fontColor: '#000000' }}
            >
              Adicionar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/listagem" variant="h7" color= "#000000">
                  Voltar para a Listagem
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}