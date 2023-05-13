import React, { useRef, useContext } from "react";
import { SpeedDial } from "primereact/speeddial";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import { Role, Icons } from "../assets/constants";
import Icon from "./../components/Icons";
import { Tooltip } from 'primereact/tooltip';
import "./../css/menuButton.css"
import { classNames } from "primereact/utils";

export default function MenuButton() {
  const navigate = useNavigate();
  const context = React.useContext(appContext);

  const [items, setItems] = React.useState<MenuItem[]>([]);

  React.useEffect(() => {
    console.log(context.user);
      if (context.user.role === Role.Student) {
        setItems([...publicItems, ...studentItems]);
      } else if (context.user.role === Role.Teacher) {
        setItems([...publicItems, ...teacherItems]);
      } else if (context.user.role === Role.Admin) {
        setItems(adminItems);
      }else{
        setItems(publicItems);
      }
  }, [context.user]);

  const publicItems: MenuItem[] = [
    {
        label: "Inicio",
        icon: (
            <Icon type = {Icons.Home} text="Inicio"/>
        ),
        command: () => {
          navigate("/");
        },
    },
    {
      label: "Utensilios",
      icon: (
        <Icon
        type = {Icons.Tools}
        text="Utensilios"
        />
      ),
      command: () => {
        navigate("/herramientas");
      },
    },
    {
        label: "Informacion",
        icon: (
            <Icon type = {Icons.Info} text="Informacion"/>
        ),
        command: () => {
          navigate("/informacion");
        },
      },
  ];

  const studentItems: MenuItem[] = [
    {
      label: "Procedimientos",
      icon: <Icon type={Icons.Procedure} text="Procedimientos"/>,
      command: () => {
        navigate("/procedimientos");
      },
    },
    {
      label: "Practicas",
      icon: <Icon type={Icons.ListCheck} text="Practicas"/>,
      command: () => {
        navigate("/practicas");
      },
    },
  ];

  const teacherItems: MenuItem[] = [
    {
      label: "Estudiantes",
      icon: <Icon type={Icons.Student} text="Estudiantes"/>,
      command: () => {
        navigate("/estudiantes");
      },
    },
  ];

  const adminItems: MenuItem[] = [
    {
      label: "Usuarios",
      icon: <Icon type={Icons.Identity} />,
      command: () => {
        navigate("/usuarios");
      },
    },
    {
      label: "Roles",
      icon: <Icon type={Icons.Role} />,
      command: () => {
        navigate("/roles");
      },
    },
    {
      label: "Permisos",
      icon: <Icon type={Icons.Check} />,
      command: () => {
        navigate("/permisos");
      },
    },
  ];

  React.useEffect(() => {
    setItems(publicItems);
    }, []);

  //TODO poner estilos en hoja de estilos
  return (
    <div className="card">
      <Tooltip target=".icon"/>
      <div style={{ position: "fixed", top: "2%", left: "96%" }}>
        <SpeedDial
          mask
          model={items}
          radius={180}
          type="quarter-circle"
          direction="down-left"
          transitionDelay={180}
          showIcon= {<Icon type={Icons.Menu} />}
          hideIcon= {<Icon type={Icons.Close} />}
        />
      </div>
    </div>
  );
}
