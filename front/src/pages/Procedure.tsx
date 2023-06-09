import React from "react";
import { Button } from "primereact/button";
import Timeline from "../components/Timeline";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { appContext } from "../App";
import "./../css/procedure.css";
import { useState } from "react";
import { Card } from "primereact/card";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import Model from "../components/Model";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";

interface IStep {
  id: number;
  name: string;
  description: string;
  image: string;
  duration: number;
  previousStep: boolean;
  tools: any[];
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

  React.useEffect(() => {
    if (steps) {
      setCurrentStep(steps[currentStepIndex]);
      const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);
      setProgress(progress <= 100 ? progress : 100);
    }
  }, [currentStepIndex]);

  const valueTemplate = (value :any) => {
    return (
        <React.Fragment>
            Paso {currentStepIndex < steps.length ? currentStepIndex + 1 : currentStepIndex} de <b>{steps.length}</b>
        </React.Fragment>
    );
};

  const initialize = async () => {
    const res = await context.apiCalls.getStepByProcedureId(id);
    const steps = res.map((item: any, index: number) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        duration: item.duration,
        previousStep: item.previousStep,
        tools: item.tools,
        index: index,
      };
    });
    setSteps(steps);
    setCurrentStep(res[0]);
    setProgress(Math.round(((currentStepIndex + 1) / steps.length) * 100));
    setIsLoading(false);
  };

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div id="procedureView">
      {isLoading ? (
        <ProgressBar className="loading" mode="indeterminate" />
      ) : (
        <>
          <Timeline value={steps} selected={currentStepIndex}></Timeline>
          <div className="selectedStep">
            <Card>
              {currentStepIndex < steps.length ? (
                <ScrollPanel className="custombar1">
                  <p>{currentStep?.description}</p>
                </ScrollPanel>
              ) : (
                <p>Procedimiento finalizado</p>
              )}
              <TabView>
                {currentStep?.tools.map((tool: any) => {
                  return (
                    <TabPanel header={tool.name}>
                      <p>{tool.description}</p>
                      <Canvas camera={{ position: [0, 0, 3] }}>
                        <Suspense fallback={null}>
                          <Model
                            path={`${tool.modelo}`}
                            scale={tool.optimalScale}
                          />
                        </Suspense>
                        <OrbitControls />
                        <ambientLight intensity={0.3} />
                        <directionalLight
                          intensity={0.4}
                          position={[0, 1, 1]}
                        />
                        <Sky sunPosition={[0, 1, 1]} turbidity={40} />
                      </Canvas>
                    </TabPanel>
                  );
                })}
              </TabView>
            </Card>
            <div  className="buttons">
              {currentStepIndex > 0 ? (
                <Button
                  label="Retroceder"
                  className="button retreat enabled"
                  onClick={() => {
                    setCurrentStepIndex(currentStepIndex - 1);
                  }}
                ></Button>
              ) : (
                <Button
                  disabled
                  label="Retroceder"
                  className="button retreat disabled"
                  onClick={() => {
                    setCurrentStepIndex(currentStepIndex - 1);
                  }}
                ></Button>
              )}
              {currentStepIndex < steps.length ? (
                <Button
                  label="Avanzar"
                  className="button advance"
                  onClick={() => {
                    setCurrentStepIndex(currentStepIndex + 1);
                  }}
                ></Button>
              ) : (
                <Button
                  label="Volver a inicio"
                  className="button finish"
                  onClick={() => {
                    navigate("/");
                  }}
                ></Button>
              )}
            </div>
          </div>
          <ProgressBar className="progress" value={progress} displayValueTemplate={valueTemplate}></ProgressBar>
        </>
      )}
    </div>
  );
}
