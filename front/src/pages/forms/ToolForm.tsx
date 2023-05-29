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
import SelectMulti from "../../components/form/SelectMulti";
import { ListBox } from "primereact/listbox";
import { appContext } from "../../App";
import '../../css/toolform.css';

class Iprops {
}



export default function ToolForm(props: Iprops) {

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [file, setFile] = React.useState<any>();
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre de la herramienta');
    const [labeldescription, setLabeldescription] = React.useState<string>('Descripción de la herramienta');
    const context = React.useContext(appContext);
    const reader = new FileReader();


    const handleName = (e: string) => {
        setName(e);
    }
    const handleDescription = (e: string) => {
        setDescription(e);
    }    
    const handleFile = (e : any) => {
        setFile(e);
        console.log("dentro de handleFile toolform",file)
    }  
    
      
    async function tools() {
        console.log('dentro de tools antes de subir la imagen--file', file)

        
        // let blob = await fetch(file.objectURL).then((r) => r.blob());
    

        // reader.readAsDataURL(file);

        // reader.onloadend = function () {  
        // const base64data = reader.result;
        // setFile(base64data);
        // console.log("base64data",base64data, "file", file)

            subiendo();

        async function subiendo() {
            // console.log("dentro de subiendo base64data",base64data)
            // let img = atob(base64data);
          
            // console.log("decode base64data", img)
        const resImg = await context.apiCalls.uploadImage(file);
        console.log("despues de uploadImage 1-------resImg", resImg)
        }
       // }



        // const resImg = await context.apiCalls.uploadImage(file); 
        // if(resImg != null){
        //     console.log('funciona imagen')
        //     console.log(resImg)
        // }else{
        //     console.log('no funciona imagen')
        // }   
        // console.log('despues de la imagen')
        // setFile(resImg)
        // console.log('reescrito file con resImg')
        // const res = await context.apiCalls.createTool(name, description, file);
        // if(res != null){
        //     console.log('funciona tool')
        //     console.log(res)

        // }else{
        //     console.log('no funciona tool')
        // }       
        // console.log("dentro de tools---file", file)
        // const resImg = await context.apiCalls.uploadImage(file); 
        // if(resImg != null){
        //     console.log('funciona imagen')
        //     console.log(resImg)
        // }else{
        //     console.log('no funciona imagen')
        // }   
        

    }

   
    const handleTool = () => {
        tools();
    }




    return (      
        <div className='col-12 tool-form'>           
          
                    <div className="col-12 panel-tool">
                        <h1 className="p-2">ToolForm</h1>
                        <div className="col-8 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>                        
                        <div className="col-8">
                            <TxtEditor description={description} handleDescription={handleDescription} />
                        </div>
                        <div className="col-8 file-tool">
                            <File file={file} handleFile={handleFile}/>    
                            <input type="file" accept="image/*" 
                            onChange={handleFile}                          
                            />                           
                                                
                        </div>
                        <div className="col-2">
                            <SubmitButton                                
                                onclik={handleTool}
                                ctx= {{name: name, description : description, modelo : file}}
                                isLogin={true}
                              />
                        </div>
                    </div>
                
       
                </div>
       
    );
}

                        
