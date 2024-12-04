import React from "react";

export const EliminarTarea = ({ id, onEliminar }) => {
  return <button onClick={() => onEliminar(id)}>X</button>;
};
