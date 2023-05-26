import { Status } from '../../assets/constants';
import React, { useRef } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";
import { useParams, useNavigate } from 'react-router-dom';
import "./../../css/steps.css";

class Iprops {

}




export default function StepForm(props: Iprops) {

    const { id } = useParams();

    const [description, setDescription] = React.useState<string>('');

    const [previousStep, setpreviousStep] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<Status>(Status.error);

    const navigate = useNavigate();

    const handleDescription = (e: string) => {
        setDescription(e);
    }

    const handlePreviousStep = (e: boolean) => {
        setpreviousStep(e);
    }

    React.useEffect(() => {
        console.log(previousStep)
    }, [previousStep])




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

            <File />

            <div className='pt-3 flex justify-content-center'>
                <div className='col-4'>
                <SubmitButton
                    onclik={() => console.log("click")}
                    ctx={{}}
                    isLogin={false}
                />
                </div>
            </div>
        </div>
    )
}