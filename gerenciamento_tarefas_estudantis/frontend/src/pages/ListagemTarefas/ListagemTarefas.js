import * as React from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../services/api";
import { GridColDef, GridColumnHeaderParams, GridCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../services/AuthContext';
import { ContractGrid } from './Styles';
import { useState } from "react";
import { Tarefas } from '../../services/usercrud';
import ConfirmDeleteModal from '../../components/ImagePickModal/ConfirmDelete/ConfirmDeleteModel';

import {
  DataContainer,
  DataAlign,
  Value,
  Label,
  Divider
} from "./Styles"

const theme = createTheme();

const memberAdminColumns = [
  {
    field: 'name', headerName: 'Atividade', minWidth: 250, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <ProjectViewLink params={params} />
  },
  {
    field: 'deadline', headerName: 'Prazo de Entrega', minWidth: 250, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <ProjectViewLink params={params} />
  },
  {
    field: 'subject', headerName: 'Matéria', minWidth: 200, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <ProjectViewLink params={params} />
  },
  {
    field: 'value', headerName: 'Pontuação', minWidth: 150, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <ProjectViewLink params={params} />
  },
  {
    field: 'activity', headerName: 'Tipo de Atividade', minWidth: 200, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <ProjectViewLink params={params} />
  },
  {
    field: 'id', headerName: 'Editar', minWidth: 100, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <Options params={params} />
  },
  {
    field: 'delete', headerName: 'Deletar', minWidth: 100, headerClassName: 'contract-grid--header'
    , renderCell: (params) => <Deletar params={params} />
  },
];

function ProjectViewLink({ params }) {
  

  return (
    <div>
      {params.value}
    </div>
  )
}

function Options({params}) {
  const navigate = useNavigate();
  return(
  <div>
  <EditIcon onClick={() => navigate(`/edittarefa/${params.id}`)} style={{ color: 'var(--app-laranja)', cursor:"pointer" }} />
  </div>
  )
}

function Deletar ({params}) {
  const navigate = useNavigate();
  
  return(
    <div>
      <ConfirmDeleteModal
        title="Excluir Tarefa"
        content={"Tem certeza que deseja excluir a tarefa?"}
        id={params.id}
        target="Project"
      />
    </div>
  )
}
export default function Listagem({ }) {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const auth = useAuth();

  const [rows, setRows] = useState({
    id: 0,
    name: "",
    deadline: "",
    subject: "",
    value: 0,
    activity: "",
  })

  React.useEffect(() => {

    async function fetchProjects() {
      try {
        const res = await api.get('/tarefa/getTarefas');
        setRows(res.data);
      } catch (err) {
        if (err.response.status === 401) {
          auth.handleLogout(false);
          navigate("/");
        }
      }
    }
    fetchProjects();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <Grid container spacing={80}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, bgcolor: '#D98695' }}
              onClick={() => navigate("/perfil")}
            >
              Visualizar Perfil
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, bgcolor: '#D98695'}}
              onClick={() => navigate("/novatarefa")}
            >
              Adicionar Tarefa
            </Button>
          </Grid>
        </Grid>
        <Container maxWidth="lg" color="app-cinza-claro">
          <CssBaseline />

          <Paper
            sx={{
              width: '100%',
              borderRadius: "10px",
              bgcolor: '#efc2c9',
              borderColor: "#D98695",
              '& .user-grid--header': {
                bgcolor: '#efc2c9',
              },
            }}

          >
            <Grid
              container
              style={{
                height: "100%",
                paddingBottom: 30,
                bgcolor: '#efc2c9',
                scrollbarColor: '#000000',
              }}
            >
              <ContractGrid
                rows={rows}
                columns={memberAdminColumns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50]}
                disableSelectionOnClick
                pagination
              />

            </Grid>
          </Paper>
        </Container>
      </Container>
    </ThemeProvider>
  );
}