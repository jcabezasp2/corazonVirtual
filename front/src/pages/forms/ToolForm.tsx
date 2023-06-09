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
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
class Iprops {
}



export default function ToolForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    // const [image, setImage] = React.useState<any>();
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

//   const onUpload = async ({files} : any) => {
//     console.log('files', files)
//     const [file] = files;
//     setSrc(file.name)
//     const reader = new FileReader();
//     reader.onload = async (e: any) => {
       
//         let result = await context.apiCalls.uploadImageBase64Fbx(e.target.result);
//         console.log('result', result)
//         setImage(result);
        
//     };
//     reader.readAsDataURL(file);
//     console.log(reader)
// };
const onUpload = async ({ files }: any) => {  
    const [file] = files;    
    console.log("file", files, "antes del delete")

    if(image === ""){
    const reader = new FileReader();
    reader.onload = async (e: any) => {
    let result = await context.apiCalls.uploadImageBase64Fbx(e.target.result);
    console.log("result",result)
    setImage(result);
    console.log("image en image vacio",image)
    setSrc(file.name)
    };
    reader.readAsDataURL(file);   

    }else{
        console.log("image en image no vacio", image)
    let img = image.split("images/")
    
    let deleteImg = img[1]
    let res = await context.apiCalls.deleteImage(deleteImg);
    if(res.ok){
    console.log("delete",deleteImg)
    }else{
    console.log("no borra")
    }
    console.log("file", files, "despues de borrar, antes de resubir")

    const reader = new FileReader();
    reader.onload = async (e: any) => {
    let result = await context.apiCalls.uploadImageBase64Fbx(e.target.result);
    console.log("result",result)
    setImage(result);
    console.log("image direction",image)
    setSrc(file.name)
    };
    reader.readAsDataURL(file);
    }
}

    
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
                    <div className="col-12 fila1">
                        <div className="col-5 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>
                        <div className="col-3 num-tool">                     
                        <InputNum num={num} handleNum={handleNum} labelnum={labelnum}/>                        
                        </div>
                        </div>
                        <div className="col-12 fila2">
                        <div id="file-tool" className="col-5 file-tool">
                     
                            <FileUpload name="image" 
                            onSelect={onUpload}
                            mode="basic" accept="image/*" auto={true} />
                            <label htmlFor="file"></label>
                        
                           </div>
                           <div className='col-5 flex justify-content-center align-content-center' id="img-toolform" >
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
                                ctx= {{name: name, description : description, modelo : image}}
                                isLogin={true}
                              />
                               <Toast ref={toast} />
                        </div>
                   
                
       
                </div>
       
    );
}

                        
