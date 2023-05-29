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

  const [items, setItems] = React.useState<MenuItem[]>([]);

  React.useEffect(() => {

      let options: MenuItem[] = [];
    
      if (context.user.role === Role.Student) {
        options = [...publicItems, ...studentItems, ...commonItems];
      } else if (context.user.role === Role.Teacher) {
        options = [...publicItems, ...teacherItems, ...commonItems];
      } else if (context.user.role === Role.Admin) {
        options = [...adminItems, ...commonItems];
      }else{
        options = [...publicItems];
      }
      options = options.reverse();
      setItems(options);
      //setItems(items.reverse());
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
    {
      label: "Pasos",
      icon: <Icon type={Icons.Steps} text="Estudiantes"/>,
      command: () => {
        navigate("/pasos");
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

  const adminItems: MenuItem[] = [
    {
      label: "Usuarios",
      icon: <Icon type={Icons.Identity} />,
      command: () => {
        navigate("/admin/usuarios");
      },
    },
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
  ];

  const commonItems: MenuItem[] = [
    {
      label: "Panel de usuario",
      icon: <Icon type={Icons.Identity} />,
      command: () => {
        context.logout();
        navigate("/panel");
      },
    },
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
      <Tooltip target=".p-speeddial-action" position="right" />
        <SpeedDial
          mask
          maskClassName="mask"
          className="speeddial-bottom-right"
          model={items}
          radius={180}
          type="quarter-circle"
          direction="down-left"
          transitionDelay={180}
          showIcon= {<Icon type={Icons.Menu} />}
          hideIcon= {<Icon type={Icons.Close} />}
        />
      </div>
  );
}
