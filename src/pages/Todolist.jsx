import React, { useState, useEffect } from "react";
import { AgregarTarea } from "../components/AgregarTarea";
import { EliminarTarea } from "../components/EliminarTarea";

export const Todolist = () => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener tareas del servidor al cargar el componente
  useEffect(() => {
    setLoading(true);
    fetch("https://playground.4geeks.com/todo/users/diegocoross", {
      method: "GET", // NO ES NECESARIO ESCRIBIR EL METODO GET
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener tareas: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLista(data.todos); // Actualiza lista con las tareas obtenidas
      })
      .catch((error) => {
        console.error("Error de red:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Modifica agregarTarea para sincronizar con servidor usando POST
  const agregarTarea = (tarea) => {
    const nuevaTarea = {
      label: tarea,
      is_done: false,
    }; // Crear una nueva tarea

    // Enviar la nueva tarea al servidor usando POST
    fetch("https://playground.4geeks.com/todo/todos/diegocoross", {
      method: "POST", // Usamos el método POST
      body: JSON.stringify(nuevaTarea), // Tarea a enviar en el cuerpo de la solicitud
      headers: {
        "Content-Type": "application/json", // Indicamos que el cuerpo es JSON
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al agregar tarea: ${response.status}`);
        }
        return response.json(); // Si la tarea se agrega con éxito, se puede manejar la respuesta
      })
      .then((data) => {
        console.log("Tarea agregada con éxito:", data);
      })
      .catch((error) => {
        console.error("Error al agregar tarea:", error);
      });
  };

  // Elimina tarea utilizando método DELETE
  const eliminarTarea = (id) => {
    console.log("Eliminando tarea con ID:", id); // Verificar ID

    // Solicitud DELETE al servidor
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // Respuesta exitosa, actualizamos  lista local
        const nuevaLista = lista.filter((item) => item.id !== id);
        setLista(nuevaLista);
      })
      .catch((error) => {
        console.error("Error al eliminar tarea:", error.message);
        alert("No se pudo eliminar la tarea.");
      });
  };

  // Función para limpiar las tareas
  const limpiarTareas = () => {
    fetch("https://playground.4geeks.com/todo/user/diegocoross", {
      method: "PUT",
      body: JSON.stringify([]), // Lista vacía
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al limpiar tareas: ${response.status}`);
        }
        setLista([]); // Limpia tareas
        console.log("Tareas eliminadas correctamente");
      })
      .catch((error) => {
        console.error("Error al limpiar las tareas:", error);
      });
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Lista de Tareas</h1>

          {loading && <p className="text-center text-muted">Cargando...</p>}

          <AgregarTarea onAgregar={agregarTarea} />

          {/* Lista de tareas */}
          <ul className="list-group mt-4">
            {lista.length === 0 && !loading ? (
              <li className="list-group-item text-center text-muted">
                No hay tareas. ¡Añade una!
              </li>
            ) : (
              lista.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{item.label}</span>
                  {/* Componente elimina tarea */}
                  <EliminarTarea id={item.id} onEliminar={eliminarTarea} />
                </li>
              ))
            )}
          </ul>

          {/* Botón para limpiar las tareas */}
          <button onClick={limpiarTareas} className="btn btn-danger mt-4 w-100">
            Limpiar Todas las Tareas
          </button>
        </div>
      </div>
    </div>
  );
};
