import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";
import { Status } from '../../assets/constants';
import TxtEditor from "../../components/form/TxtEditor";
import SubmitButton from "../../components/form/SubmitButton";
import InputTxt from "../../components/form/InputTxt";
import { appContext } from "../../App";
import '../../css/toolform.css';
import { useParams, useNavigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import InputNum from "../../components/form/InputNum";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
class Iprops {
}



export default function ToolForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [image, setImage] = useState<string>("");
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre de la herramienta');
    const [labeldescription, setLabeldescription] = React.useState<string>('Descripción de la herramienta');
    const [labelnum, setLabeNum] = React.useState<string>('Escala');
    const [num, setNum] = React.useState<number>(0.1);
    const context = React.useContext(appContext);
    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const [src, setSrc] = useState<string>('');
    const [valid, setValid] = useState<boolean>(false);





    const handleName = (e: string) => {
        setName(e);
    }
    const handleDescription = (e: string) => {
        setDescription(e);
    }
    const handleNum = (e: number) => {
        setNum(e);
    }

    React.useEffect(() => {

        if (id) {
            context.apiCalls.getTool(id).then((tool: any) => {
                setName(tool.name);
                setDescription(tool.description);
                setImage(tool.modelo);
                setNum(tool.optimalScale)

            })
        }

    }, [id])

    React.useEffect(() => {

        if (name === '' || description === '' || image === '') {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [name, description, image]);





    const onUpload = async ({ files }: any) => {

        const [file] = files;

        const nameFile = file.name;
        if (nameFile.endsWith('.fbx') === true) {

            if (image === "") {
                const reader = new FileReader();
                reader.onload = async (e: any) => {

                    let result = await context.apiCalls.uploadImageBase64Fbx(e.target.result);
                    setImage(result);

                    setSrc(file.name)
                };
                reader.readAsDataURL(file);

            } else {

                let img = image.split("images/")
                let deleteImg = img[1]
                let res = await context.apiCalls.deleteImage(deleteImg);

                const reader = new FileReader();
                reader.onload = async (e: any) => {
                    let result = await context.apiCalls.uploadImageBase64Fbx(e.target.result);
                    setImage(result);
                    setSrc(file.name)
                };
                reader.readAsDataURL(file);
            }

        } else {
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Tienes que elegir un formato de imagen válido(.fbx)', life: 3000 });
        }

    }



    const handleTool = async () => {


        if (id) {

            const resUpdate = await context.apiCalls.updateTool(id, name, description, image, num);

            if (resUpdate.ok) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Herramienta actualizada correctamente', life: 3000 });
                setTimeout(function () {
                    navigate('/herramientas')
                }, 2000);
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'La herramienta no ha podido actualizarse', life: 3000 });

            }


        } else {
            const res = await context.apiCalls.createTool(name, description, image, num);
            if (res.ok) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Herramienta creada correctamente', life: 3000 });

                setTimeout(function () {
                    navigate('/herramientas')
                }, 2000);
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se ha podido crear la herramienta', life: 3000 });
            }

        }

    }




    return (
        <div className='col-12 tool-form'>

            <div className="col-12 panel-tool">
                <div className="col-12 fila1">
                    <div className="col-5 input-tool-form">
                        <InputTxt name={name} handleName={handleName} labelname={labelname} />
                    </div>
                    <div className="col-3 num-tool">
                        <InputNum num={num} handleNum={handleNum} labelnum={labelnum} />
                    </div>
                </div>
                <div className="col-12 fila2">
                    <div id="file-tool" className="col-4 file-tool">

                        <FileUpload name="image"
                            onSelect={onUpload}
                            mode="basic" accept=".fbx" chooseLabel="Cargar imagen" auto={true} />
                        <label htmlFor="file"></label>

                    </div>
                    <div className='col-4 flex justify-content-end align-content-center' id="img-toolform" >
                        <InputText disabled placeholder={src} />
                    </div>
                </div>
            </div>
            <div className="col-8" id="editor-toolform">
                <TxtEditor description={description} handleDescription={handleDescription} />
            </div>


            <div className="col-2">
                <SubmitButton
                    onclik={handleTool}
                    ctx={{ name: name, description: description, modelo: image }}
                    isLogin={true}
                    disabled={valid}
                />
                <Toast ref={toast} />
            </div>



        </div>

    );
}


