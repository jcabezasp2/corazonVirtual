import { Status } from "./../../assets/constants";
import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';



class Iprops{
    status! : Status;
    message! : string;
}

export default function SubmitButton(props : Iprops) {

    const [loading, setLoading] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({severity:'success', summary: 'Exito', detail:`${props.message}`, life: 3000});
    }

    const showInfo = () => {
        toast.current?.show({severity:'info', summary: 'Informacion', detail:`${props.message}`, life: 3000});
    }

    const showWarn = () => {
        toast.current?.show({severity:'warn', summary: 'Atencion', detail:`${props.message}`, life: 3000});
    }

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:`${props.message}`, life: 3000});
    }

    const load = () => {
        setLoading(true); //TODO : Cambiar por llamada a API

        setTimeout(() => {
            setLoading(false);
            switch(props.status){
                case Status.success:
                    showSuccess();
                    break;
                case Status.info:
                    showInfo();
                    break;
                case Status.warn:
                    showWarn();
                    break;
                case Status.error:
                    showError();
                    break;
                default:
                    break;
            }
        }, 2000);
    };

    return (
        <div>
            <Toast ref={toast} />
            <Button label="Enviar" icon="pi pi-check" loading={loading} onClick={load} />
        </div>
    )
}
        