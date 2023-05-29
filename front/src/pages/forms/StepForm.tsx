import { Status } from '../../assets/constants';
import React, { useRef } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";
import { useParams, useNavigate } from 'react-router-dom';
import "./../../css/steps.css";
import { appContext } from "../../App";
import InputNum from "../../components/form/InputNum";
import InputTxt from "../../components/form/InputTxt";
import  ListBoxx  from "../../components/form/ListBoxx";
import { MultiSelect } from 'primereact/multiselect';
import SelectMulti from '../../components/form/SelectMulti';
import { Select } from '@react-three/drei';
import Select1 from '../../components/form/Select';

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
    const [placeholder, setPlaceholder] = React.useState<strin>('Selecciona una herramienta')
    const [options, setoptions] = React.useState<any[]>([]);
    const [toolId, setToolId] = React.useState<number>(0);


    const handleName = (e: string) => {
        setName(e);
    }

    const handleNum = (e: number) => {
        setNum(e);
        setDuration(String(num))
        console.log(num,"num", typeof num, "type")
        console.log(duration, "duration", typeof duration, "type")
        // setDuration(num.toString());
        // console.log(num,"to.string")
        // parseInt(num)
        
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
        setToolId(e);
        console.log("dentro de handleSelect stepform",toolId)
    }

   
    async function allTools() {
        const allTools = await context.apiCalls.getTools();
        if(allTools != null){
            console.log('funciona allTools')
            console.log(allTools)
            const options = allTools.map((tool: any) => ({
                label: tool.name,
                value: tool.id,
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

        // const allSteps = await context.apiCalls.getSteps();
        // // console.log(allSteps.map((step:any) => [ step.name,step.id]  ))
        // console.log(allSteps.length)
        // console.log(allSteps[id].length)
    }

    


    React.useEffect(() => {
        console.log(previousStep)
        allTools();
    }, [previousStep])

    async function steps() {
        console.log('entrando en steps')
      
        console.log(name,"--------", description,"--------", file, "--------", duration,"--------", previousStep, "---------", toolId)
        const res = await context.apiCalls.createStep(name, description, file, duration, previousStep);
        if(res != null){
            console.log('funciona createsteps')
            console.log(res)

        }else{
            console.log('no funciona createsteps')
        }             
            stepTool();
    }


    async function stepTool() {
        const allSteps = await context.apiCalls.getSteps();
        
        console.log(allSteps)
        console.log(allSteps.length)
       
        let id = allSteps.length
        console.log(id)

   
    const res2 = await context.apiCalls.addStepTool(id, toolId);
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
        <div className='pt-6 p-5'>
            <h1 className='mt-6'>StepForm</h1>
           
            <div className="py-3">                        
                <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
            </div> 
            <div className="py-3 ">                        
                <InputNum num={num} handleNum={handleNum} labelnum={labelnum}/>                           
            </div>
            <div className="p-field">
                            {/* <ListBoxx
                            // options={options}
                            options={options} 
                            handleList={handleList}
                         
                      
                            /> */}
            </div>
            <div className="p-field">
                            {/* <SelectMulti                            
                            handleSelect={handleSelect}
                            toolId={toolId}
                            options={options}
                            placeholder='Selecciona una herramienta'
                            
                            /> */}
                            <Select1
                             handleSelect={handleSelect}
                             toolId={toolId}
                             options={options}
                             placeholder={placeholder}/>
            </div>
            <div className='py-3'>
                <TxtEditor
                    handleDescription={handleDescription}
                    description={description}
                />
            </div>
            <div className='py-3'>
                <Toggle
                    onText="Es un paso previo"
                    offText="No es un paso previo"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    checked={previousStep}
                    onChange={handlePreviousStep}
                />
            </div>

            {/* <File file={file} handleFile={handleFile}/> */}

            <div className='pt-3 flex justify-content-center'>
                <div className='col-4'>
                <SubmitButton
                    onclik={handleStep}
                    ctx={{name: name, description : description, image : null, duration : num, previousStep : previousStep, toolId : toolId}}
                    isLogin={false}
                />
                </div>
            </div>
        </div>
    )
}



