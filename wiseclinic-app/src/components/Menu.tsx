import { ButtonGroup, Button } from "@mui/material";
import React from "react";

export default function Menu(){
    return (
        <React.Fragment>
            <div className="menuStyle">
                <ButtonGroup>
                    <Button variant="text">Home</Button>
                    <Button variant="text">Especialidades</Button>
                    <Button variant="text">Entrar</Button>
                </ButtonGroup>
            </div>
        </React.Fragment>
        )
}