import { Status } from '../../assets/constants';
import React, { useRef } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import SubmitButton from "../../components/form/SubmitButton";
import { useParams, useNavigate } from 'react-router-dom';
import "./../../css/stepform.css";
import { appContext } from "../../App";
import InputNum from "../../components/form/InputNum";
import InputTxt from "../../components/form/InputTxt";
import Select1 from '../../components/form/Select';
import { Toast } from "primereact/toast";
import { FileUpload } from 'primereact/fileupload';

class Iprops {

}




export default function StepForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = React.useState<string>('');
    const [labelname, setLabelname] =React.useState<string>('Nombre del paso');
    const [labelnum, setLabelnum] =React.useState<string>('Tiempo de duración del paso');
    const [description, setDescription] = React.useState<string>('');
    const [previousStep, setpreviousStep] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [image, setImage] = React.useState<string>('');
    const [num, setNum] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<string>('');; 
    const navigate = useNavigate();
    const context = React.useContext(appContext);
    const [placeholder, setPlaceholder] = React.useState<string>('Selecciona una herramienta')
    const [options, setoptions] = React.useState<any[]>([]);
    const [idAsociados, setidAsociados] = React.useState<number>(0);
    const toast = useRef(null);


    const handleName = (e: string) => {
        setName(e);
    }

    const handleNum = (e: number) => {
        setNum(e);
        setDuration(String(num))
        console.log(num,"num", typeof num, "type")
        console.log(duration, "duration", typeof duration, "type")
                
    }

    const handleDescription = (e: string) => {
        setDescription(e);
    }

    const handlePreviousStep = (e: boolean) => {
        setpreviousStep(e);
    }

   
    const handleSelect = (e: any) => {
        let select = e;
        setidAsociados(select.code);
        
        console.log("dentro de handleSelect stepform",idAsociados)
    }

   
    async function allTools() {
        const allTools = await context.apiCalls.getTools();
        if(allTools != null){
            console.log('funciona allTools')
            console.log(allTools)
            const options = allTools.map((tool: any) => ({
                name: tool.name,
                code: tool.id,
              }));
            setoptions(options)
            console.log(options,"options")
            let allcodes = allTools.map((tool: any) => {
                return tool.id
            })
            
            // console.log(allcodes,"allcodes")
       
        }else{
            console.log('no funciona allTools')
        }

    }

    


    React.useEffect(() => {
        allTools();
        if(id){
        context.apiCalls.getStep(id).then((step: any)=>{
            setName(step.name);
            setDescription(step.description);
            setNum(parseInt(step.duration))
            setImage(step.image);
            setpreviousStep(step.previousStep);

        })
        context.apiCalls.getToolByStepId(id).then((tool: any)=>{
            let utensiliosId = tool.map((tool: any) => tool.id);
            setidAsociados(utensiliosId);
            console.log("id asociados de params id", idAsociados)
        }
        )
        }

  }, [])


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

const handleStep = async () => {
    // async function steps() {
        if(id){
            if(name === '' || description === '' || image === '' || duration === ''){
                setStatus(Status.empty);
                 toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            }else{
                console.log("edit",name,"--------", description,"--------", image, "--------", duration,"--------", previousStep, "---------", idAsociados)
                const resEdit = await context.apiCalls.editStep(id,name, description, image, duration, previousStep);
                if (resEdit.ok) {
                    setStatus(Status.success);
                    toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                    console.log('funciona edit teps')
                    console.log(resEdit)
                    // const res2 = await context.apiCalls.addStepTool(id, idAsociados);
                    // console.log(res2)
                    setTimeout(function(){
                        navigate('/pasos')
                     }, 2000);
                  
                    } else {
                    setStatus(Status.error);
                    toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                    console.log('no funciona edit teps')
                    console.log(resEdit)
                }
            }
        }else{  
            if(name === '' || description === '' || image === '' || duration === ''){
                setStatus(Status.empty);
                 toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            }else{
        console.log(name,"--------", description,"--------", image, "--------", duration,"--------", previousStep, "---------", idAsociados)
            const res = await context.apiCalls.createStep(name, description, image, duration, previousStep);
            console.log("res",res)
            if (res.ok) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                console.log('funciona createsteps')
                console.log(res)
                stepTool();
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                console.log('no funciona createsteps')
            }
        }
        }
      

    }


    async function stepTool() {
        const allSteps = await context.apiCalls.getSteps();
        
        console.log(allSteps)
        console.log(allSteps.length)
       
        const lastItem = allSteps.reduce((prev:any, current:any) => {
            return prev.id > current.id ? prev : current;
          });
          console.log("lastItem",lastItem)        
        const stepId = lastItem.id;               
        console.log("stepid",stepId)       
        console.log("idAsociados", idAsociados)

    const res2 = await context.apiCalls.addStepTool(stepId, idAsociados);
    if(res2 != null){
        console.log('funciona addsteptool')
        console.log(res2)
        // setTimeout(function(){
        //     window.location.reload();
        //  }, 2000);
        }else{
            console.log('no funciona addsteptool')
        }
        
    }

    // const handleStep = () => {
    //     steps();
    // }


    return (
        <div  className='p-3 col-12 flex flex-column justify-content-center align-items-center'>
        <div id="stepform" className='p-3 col-10 '>
          
           
            <div id="inputsform-stepform" className="row py-0 col-12">      
                <div className='col-4 py-3' id="inputtxt-stepform">                
                    <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                </div>                
                <div className='col-3 ' id="inputnumb-stepform"> 
                <InputNum num={num} handleNum={handleNum} labelnum={labelnum}/>
                           
                </div>
            </div>             
            
            <div id="inputsform2-stepform" className='row  py-0 '>
                <div className='col-3' id="inputselect-stepform">  
                    
                            <Select1
                             handleSelect={handleSelect}
                             idAsociados={idAsociados}
                             options={options}
                             placeholder={placeholder}/>
                </div>    
                <div className='col-3' id="toggle-stepform" > 
                <Toggle
                    onText="Es un paso previo"
                    offText="No es un paso previo"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    checked={previousStep}
                    onChange={handlePreviousStep}
                />
                </div>
                </div>
                <div className='col-12 flex justify-content-center align-content-center' id="file-stepform" >

                <FileUpload name="image" customUpload={true} uploadHandler={onUpload}  mode="basic" accept="image/*" auto={true} />
                </div>   
            <div className='py-0 flex justify-content-center'>
                <div className='col-10' id="editor-stepform">
                <TxtEditor
                    handleDescription={handleDescription}
                    description={description}
                />
                </div>
            </div>
           


            <div className='pt-8 flex justify-content-center'>
                <div className='col-4'>
                <SubmitButton
                    onclik={handleStep}
                    ctx={{name: name, description : description, image : image, duration : num, previousStep : previousStep, toolId : idAsociados}}
                    isLogin={false}
                />
                 <Toast ref={toast} />
                </div>
            </div>
        </div>
        </div>
    )
}



