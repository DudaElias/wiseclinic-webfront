import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import '@fontsource-variable/comfortaa/';
import logo from "../png/logo-no-background.png";
import Listar from "../pages/Listar";
import Criar from "../pages/Criar";
import Cancelar from "../pages/Cancelar";


const theme = createTheme({
    palette: {
      background: {
        paper: '#F7ECE1',
      },
      text: {
        primary: '#242038',
        secondary: '#000',
      },
      action: {
        active: '#001E3C',
      }
    },
    typography:{
        fontFamily: 'Comfortaa Variable',
        body1: {
            fontWeight: 1000,
            fontSize: "20px"
        }
    }
  });

export default function Menu(){
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [listar, setListar] = React.useState(true);
    const [criar, setCriar] = React.useState(false);
    const [cancelar, setCancelar] = React.useState(false);

    const handleMenu = (index: number) => {
      setSelectedIndex(index)
      if(index === 0){
        setListar(true)
        setCriar(false)
        setCancelar(false)
      }
      else if(index === 1){
        setListar(false)
        setCriar(true)
        setCancelar(false)
      }
      else if(index === 2){
        setListar(false)
        setCriar(false)
        setCancelar(true)
      }
    };
    const list = () => (
        <Box
          sx={{ width: 250, color: "text.primary" }}
          role="presentation"
        >
         <img src={logo} alt="logo" style={{margin: "20px", width: "-webkit-fill-available"}}/>
            <List>
              <ListItem key={0} disablePadding>
              <ListItemButton onClick={() => handleMenu(0)} selected={selectedIndex === 0}>
                  <ListItemText primary={'Listar Consultas'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={1} disablePadding>
              <ListItemButton onClick={() => handleMenu(1)} selected={selectedIndex === 1}>
                  <ListItemText primary={'Criar Consulta'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={2} disablePadding>
              <ListItemButton onClick={() => handleMenu(2)} selected={selectedIndex === 2}>
                  <ListItemText primary={'Cancelar Consulta'} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      );
    return (
        <ThemeProvider theme={theme}>
        <div className="pageStyle">
         <React.Fragment>
            <Drawer variant="permanent" sx={{bgcolor: "background.paper"}}>
                {list()}
            </Drawer>
            {listar ? <Listar/> : null}
            {criar ? <Criar/> : null}
            {cancelar ? <Cancelar/> : null}
         </React.Fragment>
        </div>
        </ThemeProvider>
        )
}