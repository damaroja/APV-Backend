

#!/bin/bash

# Define el número de puerto
PORT=4000

# Encuentra el PID del proceso que utiliza el puerto especificado
PID=$(lsof -t -i :$PORT)

if [ -z "$PID" ]; then
  echo "No se encontró ningún proceso utilizando el puerto $PORT."
else
  echo "Se encontró un proceso utilizando el puerto $PORT con el PID: $PID"
  echo "Terminando el proceso..."
  kill -9 $PID
  echo "Proceso terminado."
fi