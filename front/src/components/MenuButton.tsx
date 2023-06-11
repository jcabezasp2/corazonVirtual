import React, { useRef, useContext } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from 'primereact/tooltip';
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import { Role, Icons } from "../assets/constants";
import Icon from "./../components/Icons";
import "./../css/menuButton.css"


export default function MenuButton() {
  const navigate = useNavigate();
  const context = React.useContext(appContext);




  const publicItems: MenuItem[] = [
    // {
    //     label: "Inicio",
    //     icon: (
    //         <Icon type = {Icons.Home} text="Inicio"/>
    //     ),
    //     command: () => {
    //       navigate("/");
    //     },
    // },
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
      {
        label: "Inicio",
        icon: (
            <Icon type = {Icons.Home} text="Contacto"/>
        ),
        command: () => {
          navigate("/");
        }
      }
  ];

  const studentItems: MenuItem[] = [
    {
      label: "Practicas",
      icon: <Icon type={Icons.ListCheck} text="Practicas"/>,
      command: () => {
        navigate("/practicas");
      },
    },
    {
      label: "Modo interactivo",
      icon: <Icon type={Icons.Unity} text="Practicas"/>,
      command: () => {
        navigate("/interactivo");
      },
    },    
    {
      label: "Procedimientos",
      icon: <Icon type={Icons.Procedure} text="Procedimientos"/>,
      command: () => {
        navigate("/procedimientos");
      },
    },
  ];

  const teacherItems: MenuItem[] = [
    {
      label: "Practicas",
      icon: <Icon type={Icons.ListCheck} text="Practicas"/>,
      command: () => {
        navigate("/practicas");
      },
    },
    {
      label: "Procedimientos",
      icon: <Icon type={Icons.Procedure} text="Procedimientos"/>,
      command: () => {
        navigate("/procedimientos");
      },
    },
    {
      label: "Pasos",
      icon: <Icon type={Icons.Steps} text="Estudiantes"/>,
      command: () => {
        navigate("/pasos");
      },
    },
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
      label: "Roles",
      icon: <Icon type={Icons.Role} />,
      command: () => {
        navigate("/admin/roles");
      },
    },
    {
      label: "Permisos",
      icon: <Icon type={Icons.Check} />,
      command: () => {
        navigate("/admin/permisos");
      },
    },
    {
      label: "Usuarios",
      icon: <Icon type={Icons.Users} />,
      command: () => {
        navigate("/admin/usuarios");
      },
    },
    {
      label: "Panel de usuario",
      icon: <Icon type={Icons.Identity} />,
      command: () => {
        navigate("/panel");
      },
    },
  ];

  const commonItems: MenuItem[] = [
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
      label: "Panel de usuario",
      icon: <Icon type={Icons.Identity} />,
      command: () => {
        navigate("/panel");
      },
    },
  ];

  const logout : MenuItem[] = [
    {
      label: "Cerrar sesion",
      icon: <Icon type={Icons.Logout} />,
      command: () => {
        context.logout();
        navigate("/");
      },
    },
  ];



  return (
      <div id="menu_button" >
      <Tooltip target=".p-speeddial-action" position="left" />
        <SpeedDial
          mask
          maskClassName="mask"
          className="speeddial-bottom-right"
          model={context.user.role === Role.Student? [ ...logout, ...studentItems, ...commonItems] : context.user.role === Role.Teacher? [ ...logout, ...teacherItems, ...commonItems] : context.user.role === Role.Admin? [ ...logout, ...adminItems] : [...publicItems]}
          radius={280}
          type="quarter-circle"
          direction="down-left"
          transitionDelay={180}
          showIcon= {<Icon type={Icons.Menu} />}
          hideIcon= {<Icon type={Icons.Close} />}
          onShow={() => {context.toggleMask()}}
          onHide={() => {context.toggleMask()}}
        />
      </div>
  );
}
