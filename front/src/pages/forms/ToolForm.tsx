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

class Iprops {
}



export default function ToolForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [image, setImage] = React.useState<any>();
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre de la herramienta');
    const [labeldescription, setLabeldescription] = React.useState<string>('Descripción de la herramienta');
    const context = React.useContext(appContext);
    const reader = new FileReader();
    const toast = useRef(null);

    const handleName = (e: string) => {
        setName(e);
    }
    const handleDescription = (e: string) => {
        setDescription(e);
    }    
  
    React.useEffect(() => {
      
        if(id){
        context.apiCalls.getTool(id).then((tool: any)=>{
            setName(tool.name);
            setDescription(tool.description);           
            setImage(tool.image);            
        })}      

  }, [id])

  const onUpload = async ({files} : any) => {
    console.log('files', files)
    const [file] = files;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
        let result = await context.apiCalls.uploadImageBase64(e.target.result);
        console.log('result', result)
        setImage(result);
    };
    reader.readAsDataURL(file);

};

    
const handleTool = async () => {
        
        
        if(id){
            console.log("dentro update")
            const resUpdate = context.apiCalls.updateTool(id,name, description, image);
            if (resUpdate.status === 200) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                console.log('funciona update tools')
                console.log(resUpdate)
                setTimeout(function(){
                    window.location.reload();
                 }, 2000);
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                 console.log('no funciona update tools')
            }
            
        }else{  
         
        const res = await context.apiCalls.createTool(name, description, image);
            if (res.ok) {
            setStatus(Status.success);
            toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
            console.log('funciona tool')
            console.log(res)
            setTimeout(function(){
                    window.location.reload();
                 }, 2000);
             } else {
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
            console.log('no funciona tool')
            console.log("res",res)
            }     
            }
         
        }
    

   

    return (      
        <div className='col-12 tool-form'>           
          
                    <div className="col-12 panel-tool">
                       
                        <div className="col-8 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                    
                        <div className="col-8 file-tool">
                     
                            <FileUpload name="image" customUpload={true} uploadHandler={onUpload}  mode="basic" accept="image/*" auto={true} />
                            <label htmlFor="file"></label>
                        
                        </div>           </div>                    
                        <div className="col-8" id="editor-toolform">
                            <TxtEditor description={description} handleDescription={handleDescription} />
                        </div>
                                
                     
                        <div className="col-2">
                            <SubmitButton                                
                                onclik={handleTool}
                                ctx= {{name: name, description : description, modelo : image}}
                                isLogin={true}
                              />
                               <Toast ref={toast} />
                        </div>
                    </div>
                
       
                </div>
       
    );
}

                        
