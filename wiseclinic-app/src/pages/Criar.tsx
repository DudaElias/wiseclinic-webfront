import { Button, Checkbox, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

export default function Criar() {
    return (
        <React.Fragment>
                <FormControl className="criar">
                    <span className="title">Criar Consulta</span>
                    <TextField type="text" color='primary' label="CPF do Paciente" />
                    <DatePicker label="Data" className="datePicker" />

                    <FormControl>
                        <InputLabel id="demo-simple-select-autowidth-label">Tipo do Profissional</InputLabel>
                        <Select label="Tipo do Profissional">
                            <MenuItem value={10}>Médico</MenuItem>
                            <MenuItem value={20}>Dentista</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-autowidth-label">Especialidade</InputLabel>
                        <Select label="Especialidade">
                            <MenuItem value={10}>Ortodontia</MenuItem>
                            <MenuItem value={20}>Psiquiatria</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-autowidth-label">Nome Profissional</InputLabel>
                        <Select label="Nome Profissional">
                            <MenuItem value={10}>Roberto</MenuItem>
                            <MenuItem value={20}>Carlos</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="secondary" type="submit">Criar Consulta</Button>
                </FormControl>
        </React.Fragment>
    )
}