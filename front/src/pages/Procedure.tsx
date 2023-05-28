import React from "react";
import { Button } from 'primereact/button';
import Timeline from "../components/Timeline";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from 'primereact/progressbar';
import { appContext } from "../App";
import "./../css/procedure.css";


export default function Procedure(){

    const { id } = useParams();

    const navigate = useNavigate();
    const context = React.useContext(appContext);

        const [progress, setProgress] = React.useState(0);
        const [steps, setSteps] = React.useState();
        const [currentStep, setCurrentStep] = React.useState({});
        const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

        React.useEffect(() => {
        }, []);

        const initialize = async () => {
            const res = await context.apiCalls.getStepByProcedureId(id);
            setSteps(res);
        }

        React.useEffect(() => {
            initialize();
        }, []);




        return(
            <div id="procedureView">
              <Timeline value={steps} selected={currentStepIndex}></Timeline>

              <ProgressBar value={progress}></ProgressBar>
            </div>
        )
    }