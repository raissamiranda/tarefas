import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Modal,
  TextField
} from '@mui/material';

import {
  Title,
  Content,
  ButtonContainer,
  StyledButton,
  BoxStyle
} from './Styles';

// type Props = {
//   title: string;
//   content: string;
//   openImageUrlModal: boolean;
//   handleCloseImageUrlModal: (url)=>any;
// }

export default function ImagePickModal({
  title, 
  content, 
  openImageUrlModal,
  handleCloseImageUrlModal  
}) {

  const [url,setUrl] = React.useState("");

  return (
    <Modal
    open={openImageUrlModal}
    onClose={()=>{handleCloseImageUrlModal("")}}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={BoxStyle}>
      <Title>{title}</Title>
      <TextField id="image-url-input" variant="standard" value={url} onChange={(event)=>setUrl(event.target.value)} />
      <ButtonContainer>
        <StyledButton variant="outlined" color="primary" onClick={()=>{handleCloseImageUrlModal("")}}>Cancelar</StyledButton>
        <StyledButton variant="contained" color="secondary" onClick={()=>{handleCloseImageUrlModal(url)}}>Ok</StyledButton>
      </ButtonContainer>
    </Box>
  </Modal>
  )
}