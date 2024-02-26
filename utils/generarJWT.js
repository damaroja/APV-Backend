

import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 
                                    
dotenv.config({ path: "../.env" });

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {id};
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};


const comprobarJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_JWT_SEED, (err, decoded) => {
      if (err) {
        console.log(err);
        reject("Token no válido");
      }
      resolve(decoded);
    });
  });
};



export { generarJWT, comprobarJWT };