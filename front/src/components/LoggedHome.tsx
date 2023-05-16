import React from "react";
import HomeCard from "./HomeCard";
import { Role, Icons } from "../assets/constants";
import { appContext } from "../App";
import "../css/loggedHome.css"

interface MenuItem {
  title: string;
  icon: Icons;
  destiny: string;
}

const commonItems: MenuItem[] = [
  {
    title: "Panel de usuario",
    icon: Icons.Identity,
    destiny: "/panel",
  },
  {
    title: "Herramientas",
    icon: Icons.Tools,
    destiny: "/herramientas",
  },
];

const studentItems: MenuItem[] = [
  {
    title: "Procedimientos",
    icon: Icons.Procedure,
    destiny: "/procedimientos",
  },
  {
    title: "Practicas",
    icon: Icons.ListCheck,
    destiny: "/practicas",
  },
];

const teacherItems: MenuItem[] = [
  {
    title: "Estudiantes",
    icon: Icons.Student,
    destiny: "/estudiantes",
  },
  {
    title: "Pasos",
    icon: Icons.Steps,
    destiny: "/pasos",
  },
];

const adminItems: MenuItem[] = [
  {
    title: "Usuarios",
    icon: Icons.Identity,
    destiny: "/usuarios",
  },
  {
    title: "Roles",
    icon: Icons.Role,
    destiny: "/roles",
  },
  {
    title: "Permisos",
    icon: Icons.Check,
    destiny: "/permisos",
  },
];


export default function LoggedHome() {

  const context = React.useContext(appContext);
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    if(context.user.role == Role.Student){
      setItems([...commonItems, ...studentItems])
    }else if(context.user.role == Role.Teacher){
      setItems([...commonItems, ...teacherItems])
    }else if(context.user.role == Role.Admin){
      setItems([...commonItems, ...adminItems])
    }
  }, [context.user.role]);

  return (
    <div className="loggedHome">
      {items.map((item) => (
        <HomeCard title={item.title} icon={item.icon} destiny={item.destiny}/>
      ))}
    </div>
  );
}
