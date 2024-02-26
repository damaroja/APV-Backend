

import express from "express";

import {
    mostrarPacientes,
    mostrarPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} from "../controllers/pacientesController.js";

import checkOuth from "../middleware/authMiddleware.js";

const pacienteRoutes = express.Router();


pacienteRoutes.get("/", checkOuth, mostrarPacientes)
pacienteRoutes.get("/:id", checkOuth, mostrarPaciente);
pacienteRoutes.post("/", checkOuth, crearPaciente);
pacienteRoutes.put("/:id", checkOuth, actualizarPaciente);
pacienteRoutes.delete("/:id", checkOuth, eliminarPaciente);



export default pacienteRoutes;