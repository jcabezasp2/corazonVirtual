import { Status } from "./../../assets/constants";
import React, { useState, useRef, useContext } from "react";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { appContext } from "../../App";
import User from "../../models/User";




class Iprops{
    onclik! : Function;
    ctx! : Object;
    isLogin! : boolean;
}

export default function SubmitButton(props : Iprops) {

    const context = React.useContext(appContext);

    const toast = useRef<Toast>(null);
    const [status, setStatus] = useState<Status>(Status.error);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const showSuccess = () => {
        toast.current?.show({severity:'success', summary: 'Exito', detail:`${message}`, life: 3000});
    }

    const showInfo = () => {
        toast.current?.show({severity:'info', summary: 'Informacion', detail:`${message}`, life: 3000});
    }

    const showWarn = () => {
        toast.current?.show({severity:'warn', summary: 'Atencion', detail:`${message}`, life: 3000});
    }

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:`${message}`, life: 3000});
    }

    //TODO arreglar este horror
    const load = async () => {
        setLoading(true);
        let response;
        let res;
        if(props.isLogin === true){
            response = await props.onclik(props.ctx);
            if (response.status === 200){
                res = await response.json();
                console.log(res);
                context.user = new User(res.user.id, res.user.userName, res.user.email, res.userApiKey.value, res.role, res.roleClaims );
                console.log(context.user);
            }
        }else{
            response = await props.onclik(props.ctx);
            res = await response.json();
        }
        // TODO mostrar mensaje en funcion de la respuesta
        if(response.status === 200){
            setStatus(Status.success);
            setMessage(response);
            showSuccess();
        }else{
            setStatus(Status.error);
            setMessage(response.response);
            showError();
        }

/*             switch(status){
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
            } */
        setLoading(false);
    };

    return (
        <div>
            <Toast ref={toast} />
            <Button label="Enviar" icon="pi pi-check" loading={loading} onClick={load} loadingIcon="pi pi-spin pi-cog" />
        </div>
    )
}
        