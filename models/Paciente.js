import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, maxlength: 50, trim: true },
    propietario: { type: String, required: true, maxlength: 50, trim: true },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    fechaAlta: { type: Date, required: true, trim: true },
    sintomas: { type: String, required: true, maxlength: 500, trim: true },
    veterinario: { type: mongoose.Schema.Types.ObjectId, ref: "Veterinario" },
  },
  { timestamps: true }
);

const Paciente = mongoose.model("Paciente", PacienteSchema);

export default Paciente;
