import React, { useState } from "react";
import { AgregarTarea } from "../components/AgregarTarea";
import { EliminarTarea } from "../components/EliminarTarea";

const listaInicial = [
  {
    task: "Lista de la compra",
    id: crypto.randomUUID(),
  },
  {
    task: "arroz",
    id: crypto.randomUUID(),
  },
];

export const Todolist = () => {
  const [lista, setLista] = useState(listaInicial);

  // Función agregar tarea a lista
  const agregarTarea = (tarea) => {
    const nuevaLista = [...lista, { task: tarea, id: crypto.randomUUID() }];
    setLista(nuevaLista); // Actualiza lista
  };

  // Función para eliminar tarea de la lista
  const eliminarTarea = (id) => {
    const nuevaLista = lista.filter((item) => item.id !== id);
    setLista(nuevaLista);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Lista de Tareas</h1>

          {/* Componente añade tarea */}
          <AgregarTarea onAgregar={agregarTarea} />

          {/* Lista de tareas */}
          <ul className="list-group mt-4">
            {lista.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item.task}</span>
                {/* Componente para eliminar tarea */}
                <EliminarTarea id={item.id} onEliminar={eliminarTarea} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
