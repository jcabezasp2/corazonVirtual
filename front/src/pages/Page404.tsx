import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import './../css/page404.css';

class Iprops{
    
    }

export default function Page404(props: Iprops){

    const navigate = useNavigate();
    
        return(
            <div id="page404">
                <h1 className="title404">404</h1>
                <p className="text404">La pagina que buscas aun no existe.</p>
                <Button className="btn404" label="Volver al inicio" icon="pi pi-home" onClick={() => navigate('/')} />
            </div>
        )
    }