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
import { ListBox } from "primereact/listbox";

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
    const [nameList, setNameList] = React.useState<string>('Selecciona los pasos asociados');
    const [codeList, setCodeList] = React.useState<number>(0);
    const [allcodes, setAllcodes] = React.useState<number[]>([]);
    const [options, setoptions] = React.useState<string[]>([]);


    const handleName = (e: string) => {
        setName(e);
    }

    const handleNum = (e: number) => {
        setNum(e);
        setDuration(num.toString());
        console.log(num,"to.string")
        
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

    React.useEffect(() => {
        console.log(previousStep)
    }, [previousStep])

    async function steps() {
        console.log('entrando en tools')

        console.log(name,"--------", description,"--------", file, "--------", num,"--------", previousStep)
        const res = await context.apiCalls.createStep(name, description, file, num, previousStep);
        if(res != null){
            console.log('funciona')
            console.log(res)

        }else{
            console.log('no funciona')
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
                            <ListBox
                            id="items"
                            value={nameList}
                            // options={[
                            //     { label: {nameList}, value: {codeList} },
                            //     // { label: "Option 2", value: "option2" },
                            //     // { label: "Option 3", value: "option3" },
                            // ]}
                            options={options}
                            onChange={handleList}
                            multiple
                            />
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

            <File file={file} handleFile={handleFile}/>

            <div className='pt-3 flex justify-content-center'>
                <div className='col-4'>
                <SubmitButton
                    onclik={handleStep}
                    ctx={{name: name, description : description, image : file, duration : num, previousStep : previousStep}}
                    isLogin={false}
                />
                </div>
            </div>
        </div>
    )
}