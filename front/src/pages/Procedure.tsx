import React from "react";
import { Button } from "primereact/button";
import Timeline from "../components/Timeline";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { appContext } from "../App";
import "./../css/procedure.css";
import { useState } from "react";
import { Card } from 'primereact/card';
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import Model from "../components/Model";

interface IStep {
    id: number;
    name: string;
    description: string;
    image: string;
    duration: number;
    previousStep: boolean;
}

export default function Procedure() {
  const { id } = useParams();

  const navigate = useNavigate();
  const context = React.useContext(appContext);
  const [isLoading, setIsLoading] = useState(true);

  const [progress, setProgress] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState<IStep>();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [tool, setTool] = React.useState<any>();

  React.useEffect(() => {
    if (steps) {
      setCurrentStep(steps[currentStepIndex]);
      setProgress((currentStepIndex / steps.length) * 100);
        if(currentStep != undefined){         
        const tool = context.apiCalls.getToolByStepId(currentStep.id);
        //if(tool[0].modelo != undefined)
        //setTool(tool[0]?.modelo || null);
        }
    }
  }, [currentStepIndex]);

  const initialize = async () => {
    const res = await context.apiCalls.getStepByProcedureId(id);
    setSteps(res);
    setCurrentStep(res[0]);
    const tools = await context.apiCalls.getToolByStepId(res[0].id);
    console.log('tools', tools)
    setTool(tools[0].modelo);
    console.log('tool', tool)
    setIsLoading(false);
  };

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div id="procedureView">
    {isLoading? <ProgressBar mode="indeterminate" />
    :
     <>
        <Timeline value={steps} selected={currentStepIndex}></Timeline>
        <div className="">
            <Card  title={currentStep?.name}>
                <p>{currentStep!.description}</p>
                {tool.modelo != undefined && (
                    <Canvas camera={{ position: [0, 0, 3] }}>
                    <Suspense fallback={null}>
                      <Model path={`${tool.Modelo}`} />
                    </Suspense>
                    <OrbitControls />
                    <ambientLight intensity={0.3} />
                    <directionalLight intensity={0.4} position={[0, 1, 1]} />
                    <Sky sunPosition={[0, 1, 1]} turbidity={40} />
                  </Canvas>
                )}
            </Card>
            <ProgressBar value={progress}></ProgressBar>
            <Button label="Avanzar" className="" onClick={() => {
                if (currentStepIndex <= steps.length - 1) {
                    console.log('currentStepIndex', currentStepIndex)
                    setCurrentStepIndex(currentStepIndex + 1);
                } else {
                    // TODO hacer algo cuando se termina el procedimiento
                }
            }}></Button>
        </div>
      </>}
    </div>
  );
}
