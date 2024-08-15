import React, { useEffect, useState } from 'react';
import Titulo from './Titulo';
import Input from './Input';
import ListaDeTareas from './ListaDeTareas';
import Contador from './ContadorDeTareas';

//create your first component
const Home = () => {
    const [lista, setLista] = useState([]);
    const [tarea, setTarea] = useState('');

    /* const crearUser = async () => {
        try {
            if (lista.length > 0) {
                return;
            }
            //condicion para no entrar en bucle
            const response = await fetch('https://playground.4geeks.com/todo/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            });
            // fetch(consulta) recibe como argumento la URL donde hacemos la peticion para la obtencion de datos/asincrono! promesa pendiente hasta el .then
            const data = await response.json({ user_name: 'Natalia' });
            //convertimos la respuesta en un json (o texto o lo que sea)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        crearUser();
    }, []);*/

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
            const response = await fetch('https://playground.4geeks.com/todo/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name: 'Natalia' }), // Enviar el nombre de usuario correcto
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

    useEffect(() => {
        crearUser();
        obtnerArrayApi();
    }, []);

    const subirTarea = async (tarea) => {
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
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const obtnerArrayApi = async () => {
        try {
            // Si el usuario no existe, lo creamos
            const response = await fetch('https://playground.4geeks.com/todo/users/Natalia');

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="text-center">
            <Titulo />
            <Input tarea={tarea} setTarea={setTarea} setLista={setLista} lista={lista} subirTarea={subirTarea} />
            <ListaDeTareas lista={lista} setLista={setLista} />
            <Contador lista={lista} />
        </div>
    );
};

export default Home;
