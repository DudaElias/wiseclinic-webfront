import { Alert, Box, Checkbox } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { formatDate, formatHorario } from "../utils/formaters";
import { Consulta } from "../utils/interfaces";

export default function Listar() {

  const [rows, setRows] = useState<Consulta[]>([])
  const [dia, setDia] = React.useState<String | null>();

  function handleDataSelection(newData: Dayjs | null) {
    if (newData != null) {
      const dataString = formatDate(newData)
      setDia(dataString)
      fetch(`/consultas/${dataString}`).then(response => response.json() as Promise<Consulta[]>)
        .then(data => {
          let consultas = data.map((consulta) => {
            return {
              ...consulta,
              profissional: consulta.medico ? consulta.medico : consulta.dentista,
              horario: formatHorario(consulta.horario)
            };
          })
          setRows(consultas)
        })
    }
  }

  async function handleCheckIn(id: String) {
    await fetch(`/consultas/checkIn/${id}`, {
      method: "put"
    })
  }

  function isCheckedIn(id: String) {
    const row = rows.find((row) => row.id === id)
    return row?.check_in
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'check_in', headerName: 'Check In', width: 90,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Checkbox
          size="small"
          onClick={() => { handleCheckIn(params.row.id) }}
          defaultChecked={isCheckedIn(params.row.id) ? true : false}
          style={{ marginLeft: 16 }}
          tabIndex={params.hasFocus ? 0 : -1}
        />)
    },
    {
      field: 'paciente',
      headerName: 'Paciente',
      renderCell: (params) => {
        return (
          <>
            <div>{params.value.nome}</div>
          </>
        );
      },
      editable: false,
      width: 200
    },
    {
      field: 'profissional',
      headerName: 'Profissional',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <div>{params.value.nome}</div>
          </>
        );
      },
      editable: false,
    },
    {
      field: 'horario',
      headerName: 'Horario',
      width: 100,
      editable: false,
    },
    {
      field: 'especialidade',
      headerName: 'Especialidade',
      width: 200,
      editable: false,
    }
  ];

  return (
    <React.Fragment>
      <div className="listar">
        <DatePicker label="Data" className="datePicker"
          defaultValue={dayjs(new Date())}
          onChange={(newData) => handleDataSelection(newData)}
        />
        <Box sx={{ height: 400, width: '100%' }}>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </React.Fragment>
  )
}