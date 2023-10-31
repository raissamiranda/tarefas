import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const Title = styled('span')(({ theme }) => ({
  fontSize: 20,
  width: '100%',
  textAlign: 'left',
  color: "var(--app-rosa)",
  fontWeight: 500
}));

export const Content = styled('span')(({ theme }) => ({
  fontSize: 16,
  width: '100%',
  textAlign: 'left',
  color: "var(--app-cinza)",
  fontWeight: 400
}));


export const ButtonContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 20
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 10
}));

export const BoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 422,
  height: 260,
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around'
};