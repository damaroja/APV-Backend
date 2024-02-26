import Veterinario from "../models/Veterinario.js";
import { generarID } from "../utils/generarID.js";
import { generarJWT } from "../utils/generarJWT.js";
import crypto from "crypto";
import emailRegistro from "../utils/generarEmailConfirmacion.js";
import emailResetPassword from "../utils/generarEmailResetPass.js";

const registrarVeterinario = async (req, res) => {
  const { email } = req.body;
  const veterinarioExistente = await Veterinario.findOne({ email });
  if (veterinarioExistente) {
    res.status(400).json({
      msg: "El veterinario ya existe",
      error: true,
    });
    return;
  }
  try {
    const veterinario = new Veterinario(req.body);
    veterinario.token = generarID();
    //<=========== Enviar el Token por correo ===========>
    emailRegistro({
      email: veterinario.email,
      nombre: veterinario.nombre,
      token: veterinario.token,
    });
    //=====================================================
    const veterinarioCreado = await veterinario.save();
    res.status(201).json({
      msg: "Veterinario creado con exito",
      error: false,
      veterinarioCreado,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error al crear el veterinario",
      error: true,
    });
    return;
  }
};

const confirmarVeterinario = async (req, res) => {
  const { token } = req.params;
  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    res.status(400).json({
      msg: "Token invalido",
      error: true,
    });
    return;
  }
  try {
    veterinario.token = null;
    veterinario.confirmacion = true;
    await veterinario.save();
    res.status(200).json({
      msg: "Veterinario confirmado con exito",
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error al confirmar el veterinario",
      error: true,
    });
    return;
  }
};

const perfilVeterinario = async (req, res) => {
  const { _id, nombre, email, telefono, web } = req.veterinario;
  res.status(200).json({
    msg: "Perfil del veterinario",
    error: false,
    _id,
    nombre,
    email,
    telefono,
    web,
  });
};

const loginVeterinario = async (req, res) => {
  const { email, password } = req.body;
  const veterinario = await Veterinario.findOne({ email });
  if (!veterinario) {
    res.status(400).json({
      msg: "El veterinario no existe",
      error: true,
    });
    return;
  }
  const hash = crypto.createHash("sha512");
  const data = hash.update(password, "utf-8");
  const hashPassword = data.digest("hex");
  if (hashPassword !== veterinario.password) {
    res.status(400).json({
      msg: "Contraseña incorrecta",
      error: true,
    });
    return;
  }
  if (!veterinario.confirmacion) {
    res.status(400).json({
      msg: "El veterinario no ha sido confirmado",
      error: true,
    });
    return;
  }
  const token = await generarJWT(veterinario._id);
  veterinario.token = token;
  res.status(200).json({
    msg: "Veterinario logueado con exito",
    error: false,
    _id: veterinario._id,
    nombre: veterinario.nombre,
    email: veterinario.email,
    token,
  });
  return;
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const veterinario = await Veterinario.findOne({ email });
  if (!veterinario) {
    res.status(400).json({
      msg: "El veterinario no existe",
      error: true,
    });
    return;
  }
  try {
    const token = generarID();
    veterinario.token = token;
    //<=========== Enviar el Token por correo ===========>
    emailResetPassword({
      email: veterinario.email,
      token: veterinario.token,
    });
    //======================================================
    await veterinario.save();
    res.status(200).json({
      msg: "Token enviado con exito",
      error: false,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error al enviar el token",
      error: true,
    });
    return;
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    res.status(400).json({
      msg: "Token invalido",
      error: true,
    });
    return;
  }
  res.status(200).json({
    msg: "Token valido",
    error: false,
  });
  return;
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    res.status(400).json({
      msg: "Token invalido",
      error: true,
    });
    return;
  }
  veterinario.password = password;
  veterinario.token = null;
  await veterinario.save();
  res.status(200).json({
    msg: "Contraseña actualizada con exito",
    error: false,
  });
};

const actualizarPerfilVeterinario = async (req, res) => {
  try {
    const veterinario = await Veterinario.findById(req.params.id);
    if (!veterinario) {
      res.status(400).json({
        msg: "El veterinario no existe",
        error: true,
      });
      return;
    }
    const { nombre, email, telefono, web } = req.body;
    if(veterinario.email !== email){
      const veterinarioExistente = await Veterinario.findOne({email})
      if(veterinarioExistente){
        res.status(400).json({
          msg: "El email ya esta en uso",
          error: true,
        });
        return;
      }
    }
    veterinario.nombre = nombre || veterinario.nombre;
    veterinario.email = email || veterinario.email;
    veterinario.telefono = telefono || veterinario.telefono;
    veterinario.web = web || veterinario.web;
    const veterinarioActualizado = await veterinario.save();
    res.status(200).json({
      msg: "Perfil actualizado con exito",
      error: false,
      veterinarioActualizado,
    });
  } catch (error) {

  }
};

const actualizarPasswordVeterinario = async (req, res) => {
  const { passwordActual, password } = req.body;
  const {_id} = req.veterinario;
  const veterinario = await Veterinario.findById(_id);
  if (!veterinario) {
    res.status(400).json({
      msg: "El veterinario no existe",
      error: true,
    });
    return;
  }
  const hash = crypto.createHash("sha512");
  const data = hash.update(passwordActual, "utf-8");
  const hashPassword = data.digest("hex");
  if (hashPassword !== veterinario.password) {
    res.status(400).json({
      msg: "Contraseña actual incorrecta",
      error: true,
    });
    return;
  }
  veterinario.password = password;
  await veterinario.save();
  res.status(200).json({
    msg: "Contraseña actualizada con exito",
    error: false,
  });
}

export {
  registrarVeterinario,
  loginVeterinario,
  confirmarVeterinario,
  perfilVeterinario,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfilVeterinario,
  actualizarPasswordVeterinario,
};
