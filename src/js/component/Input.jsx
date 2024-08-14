import React from 'react';

const Input = ({ tarea, setTarea, lista, setLista }) => {
    //const [tarea, setTarea] = useState('');

    console.log(tarea);

    return (
        <div>
            <input
                type="text"
                value={tarea}
                placeholder="Añade aqui tu tarea"
                onChange={(e) => setTarea(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (tarea.trim() !== '') {
                            setLista([...lista, tarea]);
                            setTarea('');
                        }
                    }
                }}
            />
        </div>
    );
};

export default Input;
