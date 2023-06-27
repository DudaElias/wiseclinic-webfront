import { Box, Checkbox } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { formatDate, formatHorario } from "../utils/formaters";
import { Consulta } from "../utils/interfaces";

export default function Listar() {

  const [rows, setRows] = useState<Consulta[]>([])
  const [, setDia] = React.useState<String | null>();

  function handleDataSelection(newData: Dayjs | null) {
    if (newData != null && newData.get('year').toString().length === 4) {
      const dataString = formatDate(newData)
      setDia(dataString)
      fetch(`/consultas/${dataString}`).then(response => response.json() as Promise<Consulta[]>)
        .then(data => {
          let consultas = data.map((consulta) => {
            return {
              ...consulta,
              horario: formatHorario(consulta.horario)
            };
          })
          setRows(consultas)
        })
    }
    else
      setRows([])
  }

  async function handleCheckIn(id: String) {
    await fetch(`/consultas/checkIn/${id}`, {
      method: "put"
    })
  }

  function isCheckedIn(id: String) {
    const row = rows.find((row) => row.id === id)
    return row?.checkin
  }

  const columns: GridColDef[] = [
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
    },
    {
      field: 'check_in', headerName: 'Check In', width: 90,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Checkbox
          size="small"
          onClick={() => { handleCheckIn(params.row.id) }}
          defaultChecked={ isCheckedIn(params.row.id) ? true : false}
          style={{ marginLeft: 16 }}
          tabIndex={params.hasFocus ? 0 : -1}
        />)
    }
  ];

  return (
    <React.Fragment>
      <div className="listar">
        <DatePicker label="Data" className="datePicker"
          defaultValue={dayjs(new Date())}
          format="DD/MM/YYYY"
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