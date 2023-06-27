import { Alert, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
    const [paciente, setPaciente] = useState<string>('')
    const [hasError, setHasError] = useState(false)
    const [isCreated, setIsCreate] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSelectTipo = (event: SelectChangeEvent) => {
        setTipo(event.target.value)
        fetch(`/especialidades/${event.target.value}`).then(data => data.json() as Promise<string[]>)
            .then(data =>
                setEspecialidades(data)
            )
    }

    const handleSelectEspecialidade = (event: SelectChangeEvent) => {
        setEspecialidade(event.target.value)
        fetch(`/${tipo === "MEDICINA" ? "medicos" : "dentistas"}/${event.target.value}`).then(data => data.json() as Promise<Profissional[]>)
            .then(data =>
                setProfissionais(data)
            )
    }

    const handleSelectProfissional = (event: SelectChangeEvent) => {
        setProfissional(event.target.value)
        fetch(`/${tipo === "MEDICINA" ? "medicos" : "dentistas"}/agenda/${event.target.value}/${dia}`).then(data => data.json() as Promise<string[]>)
            .then(data => {
                data = data.map(d => d = formatHorario(d))
                setHorarios(data)
            }
            )
    }

    const handleSelectHorario = (event: SelectChangeEvent) => {
        setHorario(event.target.value)

    }

    function handleDataSelection(newData: Dayjs | null) {
        if (newData != null && newData.get('year').toString().length === 4 && profissional) {
            const dataString = formatDate(newData)
            fetch(`/${tipo === "MEDICINA" ? "medicos" : "dentistas"}/agenda/${profissional}/${dataString}`).then(data => data.json() as Promise<string[]>)
                .then(data => {
                    data = data.map(d => d = formatHorario(d))
                    setHorarios(data)
                }
                )
            setDia(dataString)
        }
    }

    function handleSubmit() {
        if (!especialidade || !tipo || !paciente || !profissional || !horario) {
            setHasError(true)
            setErrorMessage("Dados não preenchidos corretamente!")
        }
        else {
            const body = {
                data: dia + "T" + horario + ":00",
                profissional: {
                    area: tipo,
                    especialidade,
                    documento: profissional
                },
                paciente: {
                    cpf: paciente
                }
            }
            setHasError(false)
            fetch('consultas/', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            setIsCreate(true)
        }
    }

    function handlePaciente(cpf: string) {
        var Soma = 0;
        let verificado = true
        if (cpf === undefined) {
            verificado = false;
        }

        var strCPF = cpf.replace('.', '').replace('.', '').replace('-', '');
        if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' ||
            strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' ||
            strCPF === '99999999999' || strCPF.length !== 11) {
            verificado = false;
        }

        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }

        var Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }

        if (Resto !== parseInt(strCPF.substring(9, 10))) {
            verificado = false;
        }

        Soma = 0;
        for (let k = 1; k <= 10; k++) {
            Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k)
        }

        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }

        if (Resto !== parseInt(strCPF.substring(10, 11))) {
            verificado = false;
        }
        if(!verificado){
            setHasError(true)
            setErrorMessage("CPF inválido")
        }
        else{
            setHasError(false)
            setPaciente(cpf)
        }
    }


    return (
        <React.Fragment>
            <FormControl className="criar">
                <span className="title">Criar Consulta</span>
                <TextField
                    type="text"
                    onChange={(v) => handlePaciente(v.target.value)} //Add your setVariable to this line
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
                    format="DD/MM/YYYY"
                    disablePast
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
                <FormControl disabled={profissional ? false : true}>
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
                <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit}>Criar Consulta</Button>
                {hasError ? <Alert severity="error">{errorMessage}</Alert> : null}
                {isCreated ? <Alert severity="success"> Consulta criada com sucesso!</Alert> : null}
            </FormControl>
        </React.Fragment >
    )
}