import React from "react";
import HomeCard from "./HomeCard";
import { Role, Icons } from "../assets/constants";
import { appContext } from "../App";
import Icon from "./Icons";
import "../css/loggedHome.css";
import "../css/logohome.css";

interface MenuItem {
  title: string;
  icon: Icons;
  destiny: string;
}

const commonItems: MenuItem[] = [];

const studentItems: MenuItem[] = [
  {
    title: "Procedimientos",
    icon: Icons.Procedure,
    destiny: "/procedimientos",
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
    if (context.user.role == Role.Student) {
      setItems([...commonItems, ...studentItems]);
    } else if (context.user.role == Role.Teacher) {
      setItems([...commonItems, ...teacherItems]);
    } else if (context.user.role == Role.Admin) {
      setItems([...commonItems, ...adminItems]);
    }
  }, [context.user.role]);

  return (
    <div className="loggedHome">
      <div className="firstRow row">
      <div className="logoLogged title">
        <h1 className="logo2">
          CoRAzón <br /> Virtual
        </h1>
      </div>
        <HomeCard
          title={"Panel de usuario"}
          icon={Icons.Identity}
          destiny={"/panel"}
        />
      </div>
      <div className="secondRow row">
        <HomeCard
          title={"Panel de usuario"}
          icon={Icons.Tools}
          destiny={"/herramientas"}
        />
        <div className="logoLogged">
          <Icon type={Icons.Logo} />
        </div>
        <HomeCard
          title={"Practicas"}
          icon={Icons.ListCheck}
          destiny={"/practicas"}
        />
      </div>
      <div className="thirdRow row">
        {items.map((item, index) => (
          <HomeCard
            title={item.title}
            icon={item.icon}
            destiny={item.destiny}
          />
        ))}
      </div>
    </div>
  );
}
