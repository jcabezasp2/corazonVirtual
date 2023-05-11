import { Row, Col } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";
import { Status } from '../../assets/constants';
import TxtEditor from "../../components/form/TxtEditor";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";
import InputNum from "../../components/form/InputNum";
import InputTxt from "../../components/form/InputTxt";
import Select from "../../components/form/Select";

class Iprops {
}



export default function ToolForm(props: Iprops) {

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [num, setNum] = React.useState<number>(0);
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre de la herramienta');
    const [labelnumb, setLabelnumb] = React.useState<string>('Número de pasos en los que se usa la herramienta');

    const handleName = (e: string) => {
        setName(e);
    }
    const handleDescription = (e: string) => {
        setDescription(e);
    }
    const handleNum = (e: number) => {
        setNum(e);
    }
    // const toast = useRef<Toast>(null);

    // const showSuccess = () => {
    //     toast.current?.show({ severity: 'success', summary: 'Exito', detail: `Se ha creado la herramienta ${name}`, life: 3000 });
    // }

    // const showInfo = () => {
    //     toast.current?.show({ severity: 'info', summary: 'Informacion', detail: `Se ha creado la herramienta ${name}`, life: 3000 });
    // }

    // const showWarn = () => {
    //     toast.current?.show({ severity: 'warn', summary: 'Atencion', detail: `Se ha creado la herramienta ${name}`, life: 3000 });
    // }

    // const showError = () => {
    //     toast.current?.show({ severity: 'error', summary: 'Error', detail: `Se ha creado la herramienta ${name}`, life: 3000 });
    // }

    // const load = () => {
    //     switch (status) {
    //         case Status.success:
    //             showSuccess();
    //             break;
    //         case Status.info:
    //             showInfo();
    //             break;
    //         case Status.warn:
    //             showWarn();
    //             break;
    //         case Status.error:
    //             showError();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    return (
        <div>
            {/* <Toast ref={toast} /> */}
            <Row>
                <Col>
                    <div className="p-fluid">
                        <div className="p-field">
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>
                        </div>
                        <div className="p-field">
                            <Select>
                                
                            </Select>
                            <InputNum  num={num} handleNum={handleNum} labelnumb={labelnumb}/>
                        </div>
                        <div className="p-field">
                            <TxtEditor description={description} handleDescription={handleDescription} />
                        </div>
                        <div className="p-field">
                            <File />
                        </div>
                        <div className="p-field">
                            <SubmitButton status={status} message={`Se ha creado la herramienta ${name}`} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

                        

            


