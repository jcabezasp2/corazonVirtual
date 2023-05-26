
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface Iprops {
    visible?: boolean;
    title?: string;
    content: string;
}

export default function Modal(props : Iprops) {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="Mostrar" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header={props.title} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                    {props.content}
                </p>
            </Dialog>
        </div>
    )
}
        