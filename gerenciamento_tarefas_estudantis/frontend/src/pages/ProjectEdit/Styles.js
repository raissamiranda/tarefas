import { styled } from '@mui/material/styles';


export const Divider = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: 400,
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: 60,

}));

export const PictureNameContainer = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: '60%',
  justifyContent: "center",
  alignItems: "center",
  gap: 15,
  paddingRight: '8%',
  borderRight: '1px solid rgba(0,0,0,0.2)'

}));

export const DataContainer = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: 400,
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 5,
  paddingTop: 50,
  paddingBottom: 25

}));

export const DataAlign = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 10,

}));

export const ButtonAlign = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 10
}));


export const UserNameText = styled('span')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 500,
  color: 'var(--app-cinza)',
}));

export const Avatar = styled('img')(({ theme }) => ({
  height: 181,
  width: 181,
  borderRadius: "100%",
  objectFit: "cover"
}));

export const Value = styled('span')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: 'var(--app-cinza)',
}));

export const Label = styled('span')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  color: 'var(--app-laranja)',
}));

export const ContractCreateForm = styled('form') (({ theme }) => ({
}));