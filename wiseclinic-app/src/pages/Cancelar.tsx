import { Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cancelar', headerName: 'Cancelar', width: 120,
        renderCell: (params: GridRenderCellParams<Date>) => (
          <Button variant="contained" color="error">Cancelar</Button>)
    },
    {
      field: 'nomePaciente',
      headerName: 'Paciente',
      width: 200,
      editable: false,
    },
    {
      field: 'nomeProfissional',
      headerName: 'Profissional',
      width: 200,
      editable: false,
    },
    {
      field: 'especialidade',
      headerName: 'Especialidade',
      width: 200,
      editable: false,
    }
  ];
  
  const rows = [
    { id: 1, nomePaciente: 'Snow', nomeProfissional: 'Jon', especialidade: 'ORTODONTIA' },
    { id: 2, nomePaciente: 'Lannister', nomeProfissional: 'Cersei', especialidade: 'ORTODONTIA' },
    { id: 3, nomePaciente: 'Lannister', nomeProfissional: 'Jaime', especialidade: 'ORTODONTIA' },
    { id: 4, nomePaciente: 'Stark', nomeProfissional: 'Arya', especialidade: 'ORTODONTIA' },
    { id: 5, nomePaciente: 'Targaryen', nomeProfissional: 'Daenerys', especialidade: null },
    { id: 6, nomePaciente: 'Melisandre', nomeProfissional: null, especialidade: 'ORTODONTIA' },
    { id: 7, nomePaciente: 'Clifford', nomeProfissional: 'Ferrara', especialidade: 'ORTODONTIA' },
    { id: 8, nomePaciente: 'Frances', nomeProfissional: 'Rossini', especialidade: 'ORTODONTIA' },
    { id: 9, nomePaciente: 'Roxie', nomeProfissional: 'Harvey', especialidade: 'ORTODONTIA' },
  ];

export default function Cancelar(){
    return (
        <React.Fragment>
            <div className="listar">
            <DatePicker label="Data" className="datePicker"/>
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
        </React.Fragment>        )
}