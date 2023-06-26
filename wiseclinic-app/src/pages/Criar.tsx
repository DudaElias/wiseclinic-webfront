import { Button, Checkbox, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { formatDate, formatHorario } from "../utils/formaters";
import dayjs, { Dayjs } from "dayjs";
import { Profissional } from "../utils/interfaces";

export default function Criar() {
    const [tipo, setTipo] = useState('')
    const [especialidade, setEspecialidade] = useState('')
    const [dia, setDia] = React.useState<String | null>(formatDate(dayjs(new Date())));
    const [especialidades, setEspecialidades] = useState<string[]>([])
    const [profissionais, setProfissionais] = useState<Profissional[]>([])
    const [profissional, setProfissional] = useState<string>('')
    const [horarios, setHorarios] = useState<string[]>([])
    const [horario, setHorario] = useState<string>('')


    const handleSelectTipo = (event: SelectChangeEvent) => {
        setTipo(event.target.value)
        fetch(`/especialidades/${event.target.value}`).then(data => data.json() as Promise<string[]>)
            .then(data =>
                setEspecialidades(data)
            )
    }

    const handleSelectEspecialidade = (event: SelectChangeEvent) => {
        setEspecialidade(event.target.value)
        fetch(`/${tipo === "MEDICINA" ? "medicos": "dentistas"}/${event.target.value}`).then(data => data.json() as Promise<Profissional[]>)
        .then(data =>
            setProfissionais(data)
        )
    }

    const handleSelectProfissional = (event: SelectChangeEvent) => {
        setProfissional(event.target.value)
        fetch(`/${tipo === "MEDICINA" ? "medicos": "dentistas"}/agenda/${event.target.value}/${dia}`).then(data => data.json() as Promise<string[]>)
        .then(data => {
                data = data.map(d => d = formatHorario(d))
                setHorarios(data)
            }
        )
    }

    const handleSelectHorario = (event: SelectChangeEvent) => {
        setHorario(event.target.value)
        fetch(`/`)
    }

    function handleDataSelection(newData: Dayjs | null) {
        if (newData != null) {
            const dataString = formatDate(newData)
            setDia(dataString)
        }
    }


    return (
        <React.Fragment>
            <FormControl className="criar">
                <span className="title">Criar Consulta</span>
                <TextField
                    type="text"
                    color='primary'
                    label="CPF do Paciente"
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-autowidth-label">Tipo do Profissional</InputLabel>
                    <Select label="Tipo do Profissional"
                        value={tipo}
                        onChange={handleSelectTipo}>
                        <MenuItem value={'MEDICINA'}>Médico</MenuItem>
                        <MenuItem value={'ODONTOLOGIA'}>Dentista</MenuItem>
                    </Select>
                </FormControl>
                <FormControl disabled={tipo ? false : true}>
                    <InputLabel id="demo-simple-select-autowidth-label">Especialidade</InputLabel>
                    <Select label="Especialidade"
                        value={especialidade}
                        onChange={handleSelectEspecialidade}>
                        {especialidades ? especialidades.map(especialidade => {
                            return (
                                <MenuItem key={especialidade} value={especialidade}>
                                    {especialidade}
                                </MenuItem>
                            )
                        }) : null}
                    </Select>
                </FormControl>
                <DatePicker label="Data" className="datePicker"
                    defaultValue={dayjs(new Date())}
                    disabled={tipo ? false : true}
                    onChange={(newData) => handleDataSelection(newData)} />
                <FormControl disabled={(tipo && especialidade) ? false : true}>
                    <InputLabel id="demo-simple-select-autowidth-label">Nome Profissional</InputLabel>
                    <Select label="Especialidade"
                        value={profissional}
                        onChange={handleSelectProfissional}>
                         {profissionais ? profissionais.map(p => {
                            return (
                                <MenuItem key={p.doc} value={p.doc}>
                                    {p.nome}
                                </MenuItem>
                            )
                        }) : null}
                    </Select>
                </FormControl>
                <FormControl  disabled={profissional ? false : true}>
                    <InputLabel id="demo-simple-select-autowidth-label">Horários</InputLabel>
                    <Select label="Horários"
                        value={horario}
                        onChange={handleSelectHorario}>
                        {horarios ? horarios.map(horario => {
                            return (
                                <MenuItem key={horario} value={horario}>
                                    {horario}
                                </MenuItem>
                            )
                        }) : null}
                    </Select>
                </FormControl>
                <Button variant="contained" color="secondary" type="submit">Criar Consulta</Button>
            </FormControl>
        </React.Fragment >
    )
}