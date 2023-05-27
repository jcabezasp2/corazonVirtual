import { Status } from '../../assets/constants';
import React, { useRef } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";
import { useParams, useNavigate } from 'react-router-dom';
import "./../../css/steps.css";
import { appContext } from "../../App";

class Iprops {

}




export default function StepForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = React.useState<string>('');

    const [description, setDescription] = React.useState<string>('');

    const [previousStep, setpreviousStep] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<Status>(Status.error);

    const [file, setFile] = React.useState<string>('');

    const [duration, setDuration] = React.useState<number>(0);

    const navigate = useNavigate();

    const context = React.useContext(appContext);

    const handleName = (e: string) => {
        setName(e);
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
        console.log(name,"--------", description,"--------", file)
        const res = await context.apiCalls.createStep(name, description, file, duration, previousStep);
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
                    ctx={{name: name, description : description, image : file, duration : duration, previousStep : previousStep}}
                    isLogin={false}
                />
                </div>
            </div>
        </div>
    )
}