import { comprobarJWT } from "../utils/generarJWT.js";
import Veterinario from "../models/Veterinario.js";

const checkOuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await comprobarJWT(token);
      const { id } = decoded;
      const veterinario = await Veterinario.findById(id).select(
        "-password -__v -confirmacion -createdAt -updatedAt -__v"
      );
      if (!veterinario) {
        res.status(401).json({
          msg: "Token no válido",
          error: true,
        });
        return;
      }
      req.veterinario = veterinario;
    } catch (error) {
      res.status(401).json({
        msg: "Token no válido",
        error: true,
      });
      return;
    }
  }
  next();
};

export default checkOuth;
