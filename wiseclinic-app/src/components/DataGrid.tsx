import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

export default function DataGrid(rows:any, columns: GridColDef[]){
    return(
        <React.Fragment>
        <div className="listar">
            <DatePicker label="Data" className="datePicker"/>
            <Box sx={{ height: 700}}>

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