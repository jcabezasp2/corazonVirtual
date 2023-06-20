
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import TxtEditor from "./TxtEditor";
import SubmitButton from "./SubmitButton";

interface Iprops {
    visible?: boolean;
    title?: string;
    content: any;
    onClik: Function;
}

export default function ModalForm(props : Iprops) {

    const [visible, setVisible] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(props.content.observations);
    const id = props.content.id;

    const handleDescription = (e: string) => {
        setDescription(e);
    }
    

    return (
        <div className="card flex justify-content-center">
            <Button label="Editar" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header={props.title} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <TxtEditor 
                    handleDescription={handleDescription}
                    description={description}
                 />
                <SubmitButton isLogin={false} onclik={props.onClik} ctx={{id, description}}/>
            </Dialog>
        </div>
    )
}