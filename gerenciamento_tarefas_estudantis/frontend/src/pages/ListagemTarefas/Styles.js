import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';


export const Divider = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: 400,
  justifyContent: "center",
  alignItems: "center"

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
  paddingLeft: '8%',
  display: "flex",
  flexDirection: "column",
  height: '100%',
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 15

}));

export const DataAlign = styled('div')(({ theme }) => ({
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
  color: 'var(--app-cinza)',
}));

export const ContractGrid = styled(DataGrid)(({ theme }) => ({
  minHeight: 400,
  marginTop: 50,
  marginLeft: 25,
  marginRight: 25,
  // border: "none",
}));