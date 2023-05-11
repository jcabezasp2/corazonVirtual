import React, { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

import toolsIcon from "../img/stethoscope-solid.svg";

export default function MenuButton() {
  const navigate = useNavigate();

  const [items, setItems] = React.useState<MenuItem[]>([]);

  const publicItems: MenuItem[] = [
    {
        label: "Inicio",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        ),
        command: () => {
          navigate("/");
        },
      },
    {
      label: "Utensilios",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1V192c0 53 43 96 96 96s96-43 96-96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1V192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112V265.3c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V336c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192V71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
        </svg>
      ),
      command: () => {
        navigate("/herramientas");
      },
    },
    {
        label: "Informacion",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"> <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg>
        ),
        command: () => {
          navigate("/informacion");
        },
      },
  ];

  const studentItems: MenuItem[] = [
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {},
    },
  ];

  const teacherItems: MenuItem[] = [
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {},
    },
  ];

  React.useEffect(() => {
    setItems(publicItems);
    }, []);

  //TODO poner estilos en hoja de estilos
  return (
    <div className="card">
      <div style={{ position: "fixed", top: "2%", left: "97%" }}>
        <SpeedDial
          model={items}
          direction="down"
          transitionDelay={80}
          showIcon="pi pi-bars"
          hideIcon="pi pi-times"
          buttonClassName="p-button-outlined"
        />
      </div>
    </div>
  );
}
