import { Status } from '../../assets/constants';
import React, { useRef } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";

class Iprops{

}




export default function StepForm(props: Iprops){

    const [description, setDescription] = React.useState<string>('');

    const [previousStep, setpreviousStep] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<Status>(Status.error);

    const handleDescription = (e: string) => {
        setDescription(e);
    }

    const handlePreviousStep = (e: boolean) => {
        setpreviousStep(e);
    }

    React.useEffect(() => {
        console.log(previousStep)
    }, [previousStep])




    return(
        <div>
            <h1>StepForm</h1>
            <TxtEditor 
                handleDescription={handleDescription}
                description={description}
            />
            <Toggle 
                onText="Es un paso previo"
                offText="No es un paso previo"
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                checked={previousStep}
                onChange={handlePreviousStep}
            />

            <File />

            <SubmitButton
                onclik={() => console.log("click")}
                ctx={{}}
                isLogin={false}
            />
        </div>
    )
}