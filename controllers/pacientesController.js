

import Paciente from '../models/Paciente.js'



const crearPaciente = async (req, res) => {
    try {
        const paciente = new Paciente(req.body);
        paciente.veterinario = req.veterinario._id;
        const pacienteCreado = await paciente.save();
        res.status(201).json({
            msg: "Paciente creado con exito",
            error: false,
            pacienteCreado
        });
    } catch (error) {
        res.status(400).json({
            msg: "Error al crear el paciente",
            error: true
        });
        return;
    }
    
}

const mostrarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find({ veterinario: req.veterinario._id });
        res.status(200).json({
            msg: "Pacientes encontrados",
            error: false,
            pacientes
        });
    } catch (error) {
        res.status(400).json({
            msg: "Error al buscar los pacientes",
            error: true
        });
        return;
    }

}

const mostrarPaciente = async (req, res) => {
    const {id} = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            res.status(404).json({
                msg: "Paciente no encontrado",
                error: true
            });
            return;
        }
        res.status(200).json({
            msg: `Paciente encontrado con el id: ${id}`,
            error: false,
            paciente
        });
    } catch (error) {
        res.status(400).json({
            msg: "Error al buscar el paciente",
            error: true
        });
        return;
    }

}


const actualizarPaciente = async (req, res) => {
    const {id} = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            res.status(404).json({
                msg: "Paciente no encontrado",
                error: true
            });
            return;
        }
        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({
            msg: `Paciente actualizado con el id: ${id}`,
            error: false,
            pacienteActualizado
        });
    } catch (error) {
        res.status(400).json({
            msg: "Error al actualizar el paciente",
            error: true
        });
        return;
    }

}

const eliminarPaciente = async (req, res) => {
    const {id} = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            res.status(404).json({
                msg: "Paciente no encontrado",
                error: true
            });
            return;
        }
        await Paciente.findByIdAndDelete(id);
        res.status(200).json({
            msg: `Paciente eliminado con el id: ${id}`,
            error: false
        });
    } catch (error) {
        res.status(400).json({
            msg: "Error al eliminar el paciente",
            error: true
        });
        return;
    }

}


export {
    mostrarPacientes,
    mostrarPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
}