import { Status } from '../../assets/constants';
import React, { useRef } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";
import { useParams, useNavigate } from 'react-router-dom';
import "./../../css/stepform.css";
import { appContext } from "../../App";
import InputNum from "../../components/form/InputNum";
import InputTxt from "../../components/form/InputTxt";
import Select1 from '../../components/form/Select';
import { Toast } from "primereact/toast";

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
    const [file, setFile] = React.useState<string>('');
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

    const handleFile = (e :any) => {
        setFile(e);
        console.log("dentro de handleFile toolform",file)
    }  

    const handleDescription = (e: string) => {
        setDescription(e);
    }

    const handlePreviousStep = (e: boolean) => {
        setpreviousStep(e);
    }

   
    const handleSelect = (e: any) => {
        setidAsociados(e);
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
            //setFile(step.file);
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
    

    async function steps() {
        if(id){
            console.log("edit",name,"--------", description,"--------", file, "--------", duration,"--------", previousStep, "---------", idAsociados)
            const resEdit = context.apiCalls.editStep(id,name, description, file, duration, previousStep);
            if (resEdit.status === 200) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                console.log('funciona edit teps')
                console.log(resEdit)
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                 console.log('no funciona edit teps')
            }
        }else{  
        console.log(name,"--------", description,"--------", file, "--------", duration,"--------", previousStep, "---------", idAsociados)
        const res = await context.apiCalls.createStep(name, description, file, duration, previousStep);
            if (res.status === 200) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                console.log('funciona createsteps')
                console.log(res)
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                console.log('no funciona createsteps')
            }
        }
        stepTool();

    }


    async function stepTool() {
        const allSteps = await context.apiCalls.getSteps();
        
        console.log(allSteps)
        console.log(allSteps.length)
       
        let id = allSteps.length
        console.log(id)
       
        console.log("idAsociados", idAsociados.code)
    const res2 = await context.apiCalls.addStepTool(id, idAsociados.code);
    if(res2 != null){
        console.log('funciona addsteptool')
        console.log(res2)
        }else{
            console.log('no funciona addsteptool')
        }
    }

    const handleStep = () => {
        steps();
    }


    return (
        <div  className='p-3 col-12 flex flex-column justify-content-center align-items-center'>
        <div id="stepform" className='p-3 col-10 '>
            <h1 id="h1form-stepform" className='mt-6 text-align-center'>StepForm</h1>
           
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
                    {/* <ListBoxx
                            // options={options}
                            options={options} 
                            handleList={handleList}
                         
                      
                            /> */}
          
                            {/* <SelectMulti                            
                            handleSelect={handleSelect}
                            idAsociados={idAsociados}
                            options={options}
                            placeholder='Selecciona una herramienta'
                            
                            /> */}
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
            <div className='py-0 flex justify-content-center'>
                <div className='col-10' id="editor-stepform">
                <TxtEditor
                    handleDescription={handleDescription}
                    description={description}
                />
                </div>
            </div>
           

            {/* <File file={file} handleFile={handleFile}/> */}

            <div className='pt-8 flex justify-content-center'>
                <div className='col-4'>
                <SubmitButton
                    onclik={handleStep}
                    ctx={{name: name, description : description, image : null, duration : num, previousStep : previousStep, toolId : idAsociados}}
                    isLogin={false}
                />
                 <Toast ref={toast} />
                </div>
            </div>
        </div>
        </div>
    )
}



