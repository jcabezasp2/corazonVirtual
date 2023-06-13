import React, { useState, useRef, useContext } from "react";
import * as signalR from "@microsoft/signalr";
import Timeline from "../components/Timeline";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { appContext } from "../App";
import "./../css/Interactive.css";
import { Card } from "primereact/card";
import { Canvas } from "@react-three/fiber";
import { Toast } from "primereact/toast";
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
  const navigate = useNavigate();
  const context = React.useContext(appContext);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useRef<Toast>(null);

  //Funciones para el manejo de los pasos
  const [progress, setProgress] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState<IStep>();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [procedureId, setProcedureId] = React.useState<number>(0);

  // Funciones para el manejo de la conexión con SignalR
  const [connection, setConnection] = useState<signalR.HubConnection>();

  React.useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${constants.API_URL}interactive`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  React.useEffect(() => {
    initialize();
  }, [connection]);

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

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Exito",
      detail: `Conexion con el servidor establecida`,
      life: 3000,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM576 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L416 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z" />
        </svg>
      ),
    });
  };

  const showInfo = () => {
    toast.current?.show({
      severity: "info",
      summary: "Informacion",
      detail: `Esperando a que el usuario inicie su practica`,
      life: 3000,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-96a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm0-144c8.8 0 16 7.2 16 16v80c0 8.8-7.2 16-16 16s-16-7.2-16-16V288c0-8.8 7.2-16 16-16z" />
        </svg>
      ),
    });
  };

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: `No fue posible establecer la conexion con el servidor`,
      life: 3000,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z" />
        </svg>
      ),
    });
  };

  const initialize = async () => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          showSuccess();
          setTimeout(() => {
            showInfo();
          }, 500);

          //En este punto la conexión con SignalR ya está establecida
          //se suscribe a un evento llamado ReceiveMessage
          connection.on("ReceiveMessage", async (message) => {
            if (message.userName === context.user.userName) {
              setCurrentStepIndex(message.stepId - 1);

              if (procedureId != message.procedureId) {
                setProcedureId(message.procedureId);
                await initializePractice(message.procedureId, message.stepId);
              }
              setIsLoading(false);
            }
          });
        })
        .catch((e) => {
          console.log("Connection failed: ", e);
          showError();
        });
    }
  };

  const initializePractice = async (procedureId: number, stepId: number) => {
    const res = await context.apiCalls.getStepByProcedureId(procedureId);
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
    setCurrentStep(res[stepId - 1]);
  };

  return (
    <div id="interactiveView">
      {isLoading ? (
        <>
          <Toast ref={toast} />
          <ProgressBar className="loading" mode="indeterminate" />
        </>
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
            value={Math.round(((currentStepIndex + 1) / steps.length) * 100)}
            displayValueTemplate={valueTemplate}
          ></ProgressBar>
        </>
      )}
    </div>
  );
}
