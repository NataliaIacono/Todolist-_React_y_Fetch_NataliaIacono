import React from 'react';

const Contador = ({ lista }) => {
    return <p className="tengo">{lista.length > 0 ? `Tengo ${lista.length} tareas` : 'No hay tareas, añadir tareas'}</p>;
};

export default Contador;
