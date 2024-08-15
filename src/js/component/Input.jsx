import React from 'react';

const Input = ({ tarea, setTarea, lista, setLista, subirTarea }) => {
    //const [tarea, setTarea] = useState('');

    const agregarTarea = async (e) => {
        if (e.key === 'Enter' && tarea.trim() !== '') {
            try {
                const response = await fetch('https://playground.4geeks.com/todo/users/Natalia', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        label: tarea, //
                        is_done: true,
                    }),
                });

                if (!response.ok) {
                    const nuevaLista = [...lista, { label: tarea, is_done: true }];
                    setLista(nuevaLista); // Actualiza la lista en el estado local
                    setTarea(''); // Limpia el input después de agregar la tarea
                } else {
                    const data = await response.json();
                    console.error('Error al agregar la tarea:', response.statusText);
                }
            } catch (error) {
                console.error('Error al agregar la tarea:', error);
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={tarea}
                placeholder="Añade aqui tu tarea"
                onChange={(e) => setTarea(e.target.value)}
                //onKeyDown={agregarTarea}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (tarea.trim() !== '') {
                            subirTarea(tarea);
                            setTarea('');
                        }
                    }
                }}
            />
        </div>
    );
};

export default Input;
