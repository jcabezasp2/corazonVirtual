
import React from "react"
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import Select from "../../components/form/Select";

class Iprops{

}


export default function StepForm(props: Iprops){

    const [description, setDescription] = React.useState<string>('');

    const [previousStep, setpreviousStep] = React.useState<boolean>(false);

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

            <Select />
        </div>
    )
}