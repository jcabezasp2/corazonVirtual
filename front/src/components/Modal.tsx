
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as htmlparser2 from "htmlparser2";


interface Iprops {
    visible?: boolean;
    title?: string;
    content: any;
}

const parser = new DOMParser();

export default function Modal(props : Iprops) {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="Mostrar" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header={props.title} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div dangerouslySetInnerHTML={{ __html: new XMLSerializer().serializeToString(parser.parseFromString(props.content, 'text/html')) }} />
            </Dialog>
        </div>
    )
}
        