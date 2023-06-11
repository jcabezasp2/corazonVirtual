import React from "react";
import * as signalR from "@microsoft/signalr";
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
import * as constants from "../assets/constants";
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

// Funciones para el manejo de la conexión con SignalR
  const [connection, setConnection] = useState<signalR.HubConnection>();

  React.useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${constants.API_URL}interactive`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets})
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}, []);

React.useEffect(() => {
  if (connection) {
      connection.start()
          .then(result => {
              console.log('Connected!');

              connection.on('ReceiveMessage',(username: string, message: string)  => {
                  console.log('Message received: ', message);

                  // TODO establecer el procedimiento actual
                  // TODO establecer el paso actual
              });
          })
          .catch(e => console.log('Connection failed: ', e));
        }
    
}, [connection]);











  //Funciones para el manejo de los pasos
  const [progress, setProgress] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState<IStep>();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  React.useEffect(() => {
    if (steps) {
      setCurrentStep(steps[currentStepIndex]);
      const progress = Math.round(
        ((currentStepIndex + 1) / steps.length) * 100
      );
      setProgress(progress <= 100 ? progress : 100);
    }
  }, [currentStepIndex]);

  const valueTemplate = (value: any) => {
    return (
      <React.Fragment>
        Paso{" "}
        {currentStepIndex < steps.length
          ? currentStepIndex + 1
          : currentStepIndex}{" "}
        de <b>{steps.length}</b>
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






  return (
    <div id="interactiveView">
      {isLoading ? (
        <ProgressBar className="loading" mode="indeterminate" />
      ) : (
        <>
          <Timeline value={steps} selected={currentStepIndex}></Timeline>
          <div
            className={`selectedStep ${
              context.maskVisible ? "not_visible" : ""
            }`}
          >
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
          </div>
          <ProgressBar
            className="progress"
            value={progress}
            displayValueTemplate={valueTemplate}
          ></ProgressBar>
        </>
      )}
    </div>
  );
}
