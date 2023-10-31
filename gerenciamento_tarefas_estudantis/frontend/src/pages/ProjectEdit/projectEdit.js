import React, { useEffect, useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { TarefaUpdate } from '../../services/usercrud';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { getAllUsers, UserChip } from '../../services/usercrud';
import EditIcon from '@mui/icons-material/Edit';

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
import { getTarefa } from '../../services/tarefacrud';

const theme = createTheme();


export default function ProjectUpdate() {
  const navigate = useNavigate();

  const queryString = window.location.pathname;
  const ids = queryString.substring(queryString.lastIndexOf('/') + 1);
  const id = parseInt(ids)

  const [tarefaData, setTarefaData] = useState({
    name: "",
    deadline: "",
    subject: "",
    value: "",
    activity: ""
  })

  useEffect(() => {
    setTimeout(() =>
      getTarefa(id).then(res => setTarefaData(res))
      , 500)
  }, [])

  const handleProjectUpdate = (event) => {
    event.preventDefault();
    console.log(tarefaData)
    TarefaUpdate(tarefaData, id).then((res) => navigate("/listagem"))
      .catch((err) => console.log(err.response))
  }

  function updateTarefaData(newTarefaData) {
    if (!tarefaData) return;
    setTarefaData({ ...tarefaData, ...newTarefaData });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 6
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#D98695' }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar
          </Typography>
          <Box component="form" noValidate onSubmit={handleProjectUpdate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="firstName"
                  label="Atividade"
                  autoFocus
                  color="secondary"
                  sx={{ borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                  value={tarefaData.name}
                  onChange={(e) => updateTarefaData({ name: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="deadline"
                  label="Prazo de Entrega"
                  name="deadline"
                  autoComplete="deadline"
                  color="secondary"
                  sx={{ borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                  value={tarefaData.deadline}
                  onChange={(e) => updateTarefaData({ deadline: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="subject"
                  label="Matéria"
                  name="subject"
                  autoComplete="subject"
                  color="secondary"
                  sx={{ borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                  value={tarefaData.subject}
                  onChange={(e) => updateTarefaData({ subject: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="value"
                  label="Pontuação"
                  name="value"
                  autoComplete="value"
                  color="secondary"
                  sx={{ borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                  value={tarefaData.value}
                  onChange={(e) => updateTarefaData({ value: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="activity"
                  label="Tipo de Atividade"
                  name="activity"
                  autoComplete="activity"
                  color="secondary"
                  sx={{ borderColor: '#ffcdd4', bgcolor: '#efc2c9' }}
                  value={tarefaData.activity}
                  onChange={(e) => updateTarefaData({ activity: e.target.value })}
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
              Salvar Alterações
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/listagem" variant="h7" color="#000000">
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