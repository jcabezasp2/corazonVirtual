import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import './../css/Page404.css';

class Iprops{
    
    }

export default function Page404(props: Iprops){

    const navigate = useNavigate();
    
        return(
            <div id="page404">
                <h1 className="title404">404</h1>
                <h3>Pagina no encontrada</h3>
                <p>La pagina que buscas aun no existe o ha sido movida</p>
                <Button label="Volver al inicio" icon="pi pi-home" onClick={() => navigate('/')} />
            </div>
        )
    }