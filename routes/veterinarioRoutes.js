




import express from "express";

import {
  registrarVeterinario,
  loginVeterinario,
  confirmarVeterinario,
  perfilVeterinario,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfilVeterinario,
  actualizarPasswordVeterinario
} from "../controllers/veterinariosController.js";

import checkOuth from "../middleware/authMiddleware.js";

const veterinarioRoutes = express.Router();

//Rutas Publicas
veterinarioRoutes.post("/login", loginVeterinario);
veterinarioRoutes.post("/registrar", registrarVeterinario);
veterinarioRoutes.get("/confirmar/:token", confirmarVeterinario);
veterinarioRoutes.post("/resetPassword", resetPassword);
veterinarioRoutes.get("/resetPassword/:token", comprobarToken);
veterinarioRoutes.post("/resetPassword/:token", nuevoPassword);

//Rutas Privadas
veterinarioRoutes.get('/perfil', checkOuth, perfilVeterinario)
veterinarioRoutes.put('/perfil/:id', checkOuth, actualizarPerfilVeterinario)
veterinarioRoutes.put('/actualizarPassword', checkOuth, actualizarPasswordVeterinario)


export default veterinarioRoutes;
