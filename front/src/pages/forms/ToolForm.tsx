import { Toast } from "primereact/toast";
import React, { useState, useRef} from "react";
import { Status } from '../../assets/constants';
import TxtEditor from "../../components/form/TxtEditor";
import SubmitButton from "../../components/form/SubmitButton";
import InputTxt from "../../components/form/InputTxt";
import { appContext } from "../../App";
import '../../css/toolform.css';
import { useParams, useNavigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import InputNum from "../../components/form/InputNum";

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
    const [labelnum, setLabeNum] = React.useState<string>('Escala');
    const [num, setNum] = React.useState<number>(0.7);
    const context = React.useContext(appContext);
    const toast = useRef(null);
    const navigate = useNavigate();

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
      
        if(id){
        context.apiCalls.getTool(id).then((tool: any)=>{
            setName(tool.name);
            setDescription(tool.description);           
            setImage(tool.modelo); 
            setNum(tool.optimalScale) 

        })}      

  }, [id])

  const onUpload = async ({files} : any) => {
    console.log('files', files)
    const [file] = files;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
       
        let result = await context.apiCalls.uploadImageBase64Fbx(e.target.result);
        console.log('result', result)
        setImage(result);
    };
    reader.readAsDataURL(file);
    console.log(reader)
};

    
const handleTool = async () => {
        
        
        if(id){
            if(name === '' || description === '' || image === ''){
                setStatus(Status.empty);
                 toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            }else{
                console.log("dentro update", id, name, description, image, num)
                const resUpdate = await context.apiCalls.updateTool(id,name, description, image, num);
                console.log("resUpdate",resUpdate)
                if (resUpdate.ok) {
                    setStatus(Status.success);
                    toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                    console.log('funciona update tools')
                    console.log(resUpdate)
                    setTimeout(function(){
                        navigate('/herramientas')
                    }, 2000);
                } else {
                    setStatus(Status.error);
                    toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                    console.log('no funciona update tools')
                }
                }
        }else{  
            if(name === '' || description === '' || image === ''){
                setStatus(Status.empty);
                 toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            }else{
            const res = await context.apiCalls.createTool(name, description, image, num);
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
         
        }
    

   

    return (      
        <div className='col-12 tool-form'>           
          
                    <div className="col-12 panel-tool">
                       
                        <div className="col-5 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>
                        
                        <div className="col-12 fila2">
                        <div className="col-2 file-tool">
                     
                            <FileUpload name="image" customUpload={true} uploadHandler={onUpload}  mode="basic" accept="image/*" auto={true} />
                            <label htmlFor="file"></label>
                        
                        </div>
                        <div className="col-3 num-tool">
                     
                        <InputNum num={num} handleNum={handleNum} labelnum={labelnum}/>
                        
                        </div>
                        </div>
                        </div>                    
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
       
    );
}

                        
