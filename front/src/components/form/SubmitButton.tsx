import { Status } from "./../../assets/constants";
import React, { useState, useRef, useContext } from "react";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { appContext } from "../../App";
import User from "../../models/User";
import '../../css/buttons.css';




class Iprops{
    onclik! : Function;
    ctx! : Object;
    isLogin! : boolean;
}

export default function SubmitButton(props : Iprops) {

    const context = React.useContext(appContext);

    const toast = useRef<Toast>(null);
    const [status, setStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const showSuccess = () => {
        toast.current?.show({severity:'success', summary: 'Exito', detail:`${message}`, life: 3000, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM576 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L416 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"/></svg>});
    }

    const showInfo = () => {
        toast.current?.show({severity:'info', summary: 'Informacion', detail:`${message}`, life: 3000, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-96a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm0-144c8.8 0 16 7.2 16 16v80c0 8.8-7.2 16-16 16s-16-7.2-16-16V288c0-8.8 7.2-16 16-16z"/></svg>});
    }
    
    const showWarn = () => {
        toast.current?.show({severity:'warn', summary: 'Atencion', detail:`${message}`, life: 3000, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM144 221.3c0-33.8 27.4-61.3 61.3-61.3c16.2 0 31.8 6.5 43.3 17.9l7.4 7.4 7.4-7.4c11.5-11.5 27.1-17.9 43.3-17.9c33.8 0 61.3 27.4 61.3 61.3c0 16.2-6.5 31.8-17.9 43.3l-82.7 82.7c-6.2 6.2-16.4 6.2-22.6 0l-82.7-82.7c-11.5-11.5-17.9-27.1-17.9-43.3z"/></svg>});
    }

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:`${message}`, life: 3000, icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z"/></svg>});
    }

    React.useEffect(() => {
        status === Status.success && showSuccess();
        status === Status.info && showInfo();
        status === Status.warn && showWarn();
        status === Status.error && showError();
    }, [status])



    const load = async () => {
      setLoading(true);
      setStatus(null);
      setTimeout(() => {
          setStatus(Status.error);
          setMessage('Error de conexion');
          setLoading(false);
          return null;
      }, 3000);
      console.log('submit', props.ctx)
      let response = await props.onclik(props.ctx);
      let res = await response.json();
      setMessage(await res)
    console.log("res", res)
      if (props.isLogin === true && response.status === 200) {
        const newUser = new User(
          res.user.id,
          res.user.userName,
          res.user.email,
          res.userApiKey.value,
          res.role,
          res.roleClaims,
          
        );
        const apiKey = res.userApiKey.value;
        sessionStorage.setItem('apiKey', apiKey);

        context.changeUSer(newUser);
        setStatus(Status.success);
      } else if (response.status === 200 || response.status === 201) {
        setStatus(Status.success);
      } else if (response.status === 404) {
        setStatus(Status.info);
      } else if (response.status === 401) {
        setStatus(Status.warn);
      } else {
        setStatus(Status.error);
        setMessage('Error desconocido');//TODO Validar los formularios para que este mensaje no se muestre
      }

      setLoading(false);
    };

    return (
        <div>
            <Toast ref={toast} />
            <Button className="button allbutton" label="Enviar" icon="pi pi-check" loading={loading} onClick={load} loadingIcon="pi pi-spin pi-cog" />
        </div>
    )
}
        