import { Row, Col, Placeholder } from "react-bootstrap";
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
import SelectMulti from "../../components/form/SelectMulti";
import { appContext } from "../../App";
import '../../css/toolform.css';
import { MultiSelect } from "primereact/multiselect";
import "./../../css/procedureform.css";
import { useParams } from 'react-router-dom';
import { getStep } from "../../assets/endpoints";
import { FileUpload } from 'primereact/fileupload';


class Iprops {
}

interface Iprocedure {
    name: string;
    imageDirection: string;
}

export default function ToolForm(props: Iprops) {

    const context = React.useContext(appContext);

    const { id } = useParams();
    const [name , setName] = useState<string>('');
    const [imageDirection , setImageDirection] = useState<string>('');
    const [ctx, setCtx] = useState<any>(null);

    React.useEffect(() => {
        let currentCtx : Iprocedure = {
            name: name ? name : '',
            imageDirection: imageDirection ? imageDirection :  '',
        };
        setCtx(currentCtx);
    }, [name, imageDirection]);



    const onUpload = async ({files} : any) => {
        console.log('files', files)
        const [file] = files;
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            let result = await context.apiCalls.uploadImageBase64(e.target.result);
            console.log('result', result)
            setImageDirection(result);
        };
        reader.readAsDataURL(file);

    };





    return (      
        <div  className='col-12 flex flex-column justify-content-center align-items-center' id='procedureForm'>
            <InputText className='col-12 col-md-6' placeholder='Nombre' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            {/* <InputText className='col-12 col-md-6' placeholder='Direccion de la imagen' value={imageDirection} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageDirection(e.target.value)}/> */}
            <FileUpload name="image" customUpload={true} uploadHandler={onUpload}  mode="basic" accept="image/*" auto={true} />
            <label htmlFor="file">Upload</label>
           {/* <input type="file" name="file" onChange={changeFile} /> */}

            <SubmitButton onclik={context.apiCalls.createProcedure} ctx={ctx} isLogin={false} />


        </div>  
     
       
    );
}

                        


