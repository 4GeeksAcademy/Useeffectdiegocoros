import React, { useState } from "react";

export const AgregarTarea = ({ onAgregar }) => {
  const [nuevaTarea, setNuevaTarea] = useState("");

  const manejarAgregar = () => {
    if (nuevaTarea.trim() === "") return; // Evitar agregar tareas vacías
    onAgregar(nuevaTarea); // Llamar a la función para agregar tarea
    setNuevaTarea(""); // Limpia el input
    window.location.reload(); // Refresca la página
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea"
        style={{
          padding: "10px",
          width: "80%",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={manejarAgregar}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Añadir
      </button>
    </div>
  );
};
