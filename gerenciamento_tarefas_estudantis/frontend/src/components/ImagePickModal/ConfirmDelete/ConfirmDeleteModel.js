import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Modal
} from '@mui/material';

import {
  Title,
  Content,
  ButtonContainer,
  StyledButton,
  BoxStyle
} from './Styles';

import { DeleteUser } from "../../../services/usercrud";
import { deleteTarefa } from '../../../services/tarefacrud';


//! Definir callback


export default function ConfirmDeleteModal({ title, content, id, target, white }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    switch (target) {
      case "User":
        DeleteUser(id);
        break;
      case "Project":
        deleteTarefa(id);
        break;
    }
    setOpen(false);
  }


  return (
    <div>
      <DeleteIcon onClick={handleOpen} style={{ color: white ? 'var(--app-branco)' : 'var(--app-rosa)', cursor: 'pointer' }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={BoxStyle}>
          <Title>{title}</Title>
          <Content>{content}</Content>
          <ButtonContainer>
            <StyledButton variant="outlined" style={{color: '#D98695', borderBlockColor: '#D98695', borderInlineColor: '#D98695'}}  onClick={handleClose}>Cancelar</StyledButton>
            <StyledButton variant="contained" style={{backgroundColor: '#D98695', borderBlockColor: '#D98695', borderInlineColor: '#D98695'}} onClick={handleDelete}>Excluir</StyledButton>
          </ButtonContainer>
        </Box>
      </Modal>
    </div>
  );
}