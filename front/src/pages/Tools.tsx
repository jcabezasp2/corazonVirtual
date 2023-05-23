import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import "./../css/tools.css";

class Iprops {}

interface ITool {
  id: number;
  name: string;
  description: string;
  modelo: string;
}

export default function Claims(props: Iprops) {
  const navigate = useNavigate();
  const context = React.useContext(appContext);
  const [tools, setTools] = React.useState([]);
  const [display, setDisplay] = React.useState("grid");

  const listItem = (tool: any) => {
    return tool? (
      <div className="col-12">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={`${tool.modelo}`}
              alt={tool.Nombre}
            />
            <div className="text-2xl font-bold">{tool.Nombre}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button
              icon="pi pi-eye"
              className="p-button"
              onClick={() => {}}
            ></Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <Skeleton className="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round" />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <Skeleton className="w-8rem border-round h-2rem" />
              <Skeleton className="w-6rem border-round h-1rem" />
              <div className="flex align-items-center gap-3">
                <Skeleton className="w-6rem border-round h-1rem" />
                <Skeleton className="w-3rem border-round h-1rem" />
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Skeleton className="w-4rem border-round h-2rem" />
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (tool: any) => {
    return tool ? (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={`${tool.modelo}`}
              alt={tool.Nombre}
            />
            <div className="text-2xl font-bold">{tool.Nombre}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button
              icon="pi pi-eye"
              className="p-button"
              onClick={() => {}}
            ></Button>
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

    if (layout === "list") return listItem(item);
    else if (layout === "grid") return gridItem(item);
  };

  const header = () => {
    return (
      <div className="tools-header">
        {context.user.role == Role.Teacher && <Button
          label="Crear utensilio"
          severity="secondary"
          onClick={() => {
            navigate("/herramientas/formulario");
          }}
        />}
        
        <DataViewLayoutOptions
          layout={"grid"}
          onChange={(e) => setDisplay(e.value)}
        />
      </div>
    );
  };

  const initialize = async () => {
    const response = await context.apiCalls.getTools();

    const tools = response.map((tool: ITool) => {
      return {
        id: tool.id,
        Nombre: tool.name,
        Descripcion: tool.description,
        Modelo: tool.modelo,
      };
    });
    setTools(tools);
  };

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div id="toolsView">
      <div className="card">
        <DataView
          className="tools"
          value={tools}
          itemTemplate={itemTemplate}
          layout={"grid"}
          header={header()}
          paginator rows={3}
        />
      </div>
    </div>
  );
}
