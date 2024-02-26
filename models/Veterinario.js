import mongoose from "mongoose";
import crypto from "crypto";

const VeterinarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    telefono: {
      type: String,
      trim: true,
      default: null,
    },
    web: {
      type: String,
      trim: true,
      default: null,
    },
    token: {
      type: String,
      trim: true,
      default: null,
    },
    confirmacion: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);




VeterinarioSchema.pre('save', function(next){
  if(!this.isModified("password")){
    next()
    return
  }
  const hash =  crypto.createHash('sha512');
  const data =  hash.update(this.password, 'utf-8');
  this.password = data.digest('hex')
  next()
})

const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export default Veterinario;

