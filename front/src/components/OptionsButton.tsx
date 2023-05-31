import React, { useRef } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { useNavigate } from "react-router-dom";
//TODO implementar

class Iprops {
    id!: number;
    onDelete!: Function;
    onEdit!: string;
}

export default function OptionsButton(props : Iprops) {

    const toast = useRef(null);
    const navigate = useNavigate();
    const items = [
        {
            label: 'Borrar',
            icon: 'pi pi-trash',
            command: () => {
                props.onDelete(props.id);
            
            }
        },
    ];

    const edit = () => {
        navigate(props.onEdit);
    }

    return (
        <div>
            <SplitButton label="Editar" icon="pi pi-pencil" onClick={edit} model={items} />
        </div>
    )
}