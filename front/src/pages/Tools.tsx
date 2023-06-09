import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import React, { useState, useEffect, useRef } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import Model from "../components/Model";
import ViewerModal from "../components/ViewerModal";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import "./../css/tools.css";
import OptionsButton from '../components/OptionsButton';
import { Toast } from "primereact/toast";
import { Status } from "../assets/constants";

class Iprops {}

interface ITool {
  id: number;
  name: string;
  description: string;
  modelo: string;
  optimalScale: number;
  
}

export default function Claims(props: Iprops) {
  const navigate = useNavigate();
  const context = React.useContext(appContext);
  const [tools, setTools] = React.useState([]);
  const [selectedTool, setSelectedTool] = React.useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useRef<any>(null);
  const [status, setStatus] = React.useState<Status>(Status.error);
  const [toolID, setToolID] = React.useState<number>(0)

  const setVisible = () => {
    setModalVisible(!modalVisible);
    };


    console.log("tools",tools)


    const onDelete = async (id: number) => {

        const res = await context.apiCalls.deleteTool(id);
      console.log("dentro de ondelete")
      if (res.ok) {
          setStatus(Status.success);
          toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
          setTimeout(function(){
            window.location.reload();
         }, 1000); 
      } else {
          setStatus(Status.error);
          toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
      }
      
    
      
  }

  const gridItem = (tool: any) => {
    return tool ? (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <Suspense fallback={null}>
                <Model path={`${tool.Modelo}`} scale={tool.Escala} />
              </Suspense>
              <OrbitControls />
              <ambientLight intensity={0.3} />
              <directionalLight intensity={0.4} position={[0, 1, 1]} />
              <Sky sunPosition={[0, 1, 1]} turbidity={40} />
            </Canvas>

            <div className="text-2xl font-bold">{tool.Nombre}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button
              icon="pi pi-eye"
              className="p-button"
              onClick={() => {setModalVisible(true); setSelectedTool(tool);}}
            ></Button>
            {context.user.role == Role.Teacher && <OptionsButton id={tool.id}   onEdit={`formulario/${tool.id}`} onDelete={onDelete}/>}
            
          </div>
        </div>
      </div>
    ) : (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Skeleton className="w-6rem border-round h-1rem" />
            <Skeleton className="w-3rem border-round h-1rem" />
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <Skeleton className="w-9 shadow-2 border-round h-10rem" />
            <Skeleton className="w-8rem border-round h-2rem" />
            <Skeleton className="w-6rem border-round h-1rem" />
          </div>
          <div className="flex align-items-center justify-content-between">
            <Skeleton className="w-4rem border-round h-2rem" />
            <Skeleton shape="circle" className="w-3rem h-3rem" />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (item: any, layout: string) => {
    if (!item) {
      return;
    }

     return gridItem(item);
  };

  const header = () => {
    return (
      <div className="tools-header">
        {context.user.role == Role.Teacher && (
          <Button
            label="Crear utensilio"
            severity="secondary"
            onClick={() => {
              navigate("/herramientas/formulario") ;
            }}
          />
        )}

      </div>
    );
  };

  const initialize = async () => {
    const response = await context.apiCalls.getTools();
    console.log("response",response)
    const tools = response.map((tool: ITool) => {
      return {
        id: tool.id,
        Nombre: tool.name,
        Descripcion: tool.description,
        Modelo: tool.modelo,
        Escala: tool.optimalScale,
      };
    });
    setTools(tools);
   

  };

  
  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div id="toolsView">
        {selectedTool && <ViewerModal visible={modalVisible} title ={selectedTool!.Nombre} Modelo={selectedTool!.Modelo} setVisible={setVisible} description={selectedTool.Descripcion} /> }
      <div className="card">
        <DataView
          className="tools"
          value={tools}
          itemTemplate={itemTemplate}
          layout={"grid"}
          header={header()}
          paginator
          rows={3}
        />
      </div>
      <Toast ref={toast} />
    </div>
  );
}


