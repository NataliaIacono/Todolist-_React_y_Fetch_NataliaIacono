import React, { useEffect, useState } from 'react';
import Titulo from './Titulo';
import Input from './Input';
import ListaDeTareas from './ListaDeTareas';
import Contador from './ContadorDeTareas';

//create your first component
const Home = () => {
    const [lista, setLista] = useState([]);
    const [tarea, setTarea] = useState('');
    return (
        <div className="text-center">
            <Titulo />
            <Input tarea={tarea} setTarea={setTarea} setLista={setLista} lista={lista} />
            <ListaDeTareas lista={lista} setLista={setLista} />
            <Contador lista={lista} />
        </div>
    );
};

export default Home;
