import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import '@fontsource-variable/comfortaa/';
import logo from "../png/logo-no-background.png";

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
    const list = () => (
        <Box
          sx={{ width: 250, color: "text.primary" }}
          role="presentation"
        >
         <img src={logo} alt="logo" style={{margin: "20px", width: "-webkit-fill-available"}}/>
            <List>
            {['Listar Consultas', 'Criar Consulta', 'Cancelar Consulta'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    return (
        <ThemeProvider theme={theme}>
        <div>
         <React.Fragment>
            <Drawer variant="permanent" sx={{bgcolor: "background.paper"}}>
                {list()}
            </Drawer>
         </React.Fragment>
        </div>
        </ThemeProvider>
        )
}