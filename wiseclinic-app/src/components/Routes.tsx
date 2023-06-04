import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Especialidade from "../pages/Especialidade";
import Entrar from "../pages/Entrar";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" ></Route>
                <Route element={<Especialidade/>} path="/especialidade" ></Route>
                <Route element={<Entrar/>} path="/entrar" ></Route>
            </Routes>
        </BrowserRouter>
    )
}