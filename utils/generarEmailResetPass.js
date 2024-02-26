


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const emailResetPassword = async (datos) => {
  const { email, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: "APV - Administrador de pacientes de veterinaria",
    to: email,
    subject: "Reseteo de contraseña",
    text: `Reseteo de contraseña`,
    html: `
          <h1>Reseteo de contraseña</h1>
          <p>Para eeseteo de contraseña haz click en el siguiente enlace</p>
          <a href="${process.env.FRONTEND_URL}/resetPassword/${token}">Resetea mi Password</a>
        `,
  });
};

export default emailResetPassword;