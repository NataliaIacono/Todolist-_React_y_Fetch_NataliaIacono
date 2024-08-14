import React from 'react';

const ListaDeTareas = ({ lista, setLista }) => {
    //const [lista, setLista] = useState([]);

    // setLista([...lista, tarea]);

    const eliminarTarea = (index) => {
        console.log(index);

        const nuevaLista = lista.filter((_, i) => i !== index);
        setLista(nuevaLista);
    };

    return (
        <div>
            <ul>
                {lista.map((item, index) => (
                    <li key={index}>
                        {' '}
                        {item}
                        <button
                            className="basura"
                            onClick={() => {
                                eliminarTarea(index);
                            }}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDeTareas;
