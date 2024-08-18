import React, { useEffect, useState } from 'react';
import Titulo from './Titulo';
import Input from './Input';
import ListaDeTareas from './ListaDeTareas';
import Contador from './Contador';

//create your first component
const Home = () => {
    const [lista, setLista] = useState([]);
    const [tarea, setTarea] = useState('');

    const verificarUsuario = async () => {
        try {
            // Verificamos si el usuario ya existe
            const response = await fetch('https://playground.4geeks.com/todo/users/Natalia', {
                method: 'GET',
            });

            if (response.ok) {
                console.log('Usuario ya existe');
                return true; // Usuario ya existe
            } else if (response.status === 404) {
                console.log('Usuario no encontrado');
                return false; // Usuario no existe
            } else {
                throw new Error('Error al verificar usuario');
            }
        } catch (error) {
            console.log('Error al verificar usuario:', error);
            return false;
        }
    };

    const crearUser = async () => {
        try {
            if (await verificarUsuario()) {
                return; // No hacemos nada si el usuario ya existe
            }

            // Si el usuario no existe, lo creamos
            const response = await fetch('https://playground.4geeks.com/todo/users/Natalia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error en la creación del usuario');
            }

            const data = await response.json();
            console.log('Usuario creado:', data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const subirTarea = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/Natalia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    label: tarea,
                    is_done: false,
                }),
            });

            if (!response.ok) {
                throw new Error('Error en subir la tarea');
            }

            const data = await response.json();
            console.log('Tarea subida:', data);
            setLista([...lista, data]);
        } catch (error) {
            console.log('Error:', error);
        }

        setTarea('');
    };

    const obtnerArrayApi = async () => {
        try {
            // Si el usuario no existe, lo creamos
            const response = await fetch('https://playground.4geeks.com/todo/users/Natalia');

            const data = await response.json();
            setLista(data.todos);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    /*const eliminarTarea = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.text();

            setLista(data.todos);
            console.log('ID de la tarea a eliminar:', id);

            console.log('tarea eliminada');
        } catch (error) {
            console.log('Error:', error);
        }
    };*/

    const eliminarTarea = async (id) => {
        try {
            const respuesta = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
            });

            console.log(id);
            const data = await respuesta.text(); // por que con .text funciona bien?
            const newLista = lista.filter((item) => {
                return item.id != id;
            });

            setLista(newLista);
            console.log(typeof data);
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const eliminarTodasLasTareas = async () => {
        try {
            const respuesta = await fetch('https://playground.4geeks.com/todo/users/Natalia', {
                method: 'DELETE',
            });

            await respuesta.text(); // por que con .text funciona bien?

            setLista([]);
            await crearUser();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    /* const editar = async (id) => {
        try {
            const respuesta = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'PUT',
            });

            console.log(respuesta);
            const data = await respuesta.json(); // por que con .text funciona bien?
            // falta algo
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };*/

    /*const editar = async (id, nuevaLabelTarea) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                label: nuevaLabelTarea,
                is_done: true,
            }),
        });
        const data = await response.json();
        setLista(
            lista.map((item) => {
                return id === item.id ? data: item
            }),
        );
    };*/

    useEffect(() => {
        crearUser();
        obtnerArrayApi();
    }, []);

    return (
        <div className="text-center">
            <Titulo />
            <Input tarea={tarea} setTarea={setTarea} subirTarea={subirTarea} />
            <ListaDeTareas lista={lista} eliminarTarea={eliminarTarea} />
            <Contador lista={lista} />
            <button
                onClick={() => {
                    eliminarTodasLasTareas();
                }}>
                Eliminar todo
            </button>
        </div>
    );
};

export default Home;
