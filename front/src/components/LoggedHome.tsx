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

const commonItems: MenuItem[] = [
  {
    title: "Utensilios",
    icon: Icons.Tools,
    destiny: "/herramientas",
  },
  {
    title: "Practicas",
    icon: Icons.ListCheck,
    destiny: "/practicas",
  },
];

const studentItems: MenuItem[] = [
  {
    title: "Procedimientos",
    icon: Icons.Procedure,
    destiny: "/procedimientos",
  },
  {
    title: "Modo interactivo",
    icon: Icons.Unity,
    destiny: "/interactivo",
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
  {
    title: "Procedimientos",
    icon: Icons.Procedure,
    destiny: "/procedimientos",
  },
];

const adminItems: MenuItem[] = [
  {
    title: "Usuarios",
    icon: Icons.Users,
    destiny: "/admin/usuarios",
  },
  {
    title: "Roles",
    icon: Icons.Role,
    destiny: "/admin/roles",
  },
  {
    title: "Permisos",
    icon: Icons.Check,
    destiny: "/admin/permisos",
  },
];

export default function LoggedHome() {
  const context = React.useContext(appContext);
  const [items, setItems] = React.useState<any[]>(
    context.user.role == Role.Student
      ? [...commonItems, ...studentItems]
      : context.user.role == Role.Teacher
      ? [...commonItems, ...teacherItems]
      : [...adminItems]
  );

  React.useEffect(() => {
    if (context.user.role == Role.Student) {
      setItems([...commonItems, ...studentItems]);
    } else if (context.user.role == Role.Teacher) {
      setItems([...commonItems, ...teacherItems]);
    } else if (context.user.role == Role.Admin) {
      setItems([...adminItems]);
    }
  }, [context.user.role]);

  return (
    <div className="loggedHome">
      <div></div>
      <div className="scalein animation-duration-1000">
        <HomeCard
          title={"Panel de usuario"}
          icon={Icons.Identity}
          destiny={"/panel"}
        />
      </div>
      {
        <div className="scalein animation-duration-1000">
          <HomeCard
            title={items[0].title}
            icon={items[0].icon}
            destiny={items[0].destiny}
          />
        </div>
      }
       <div></div>
       {
        <div className="scalein animation-duration-1000">
          <HomeCard
            title={items[1].title}
            icon={items[1].icon}
            destiny={items[1].destiny}
          />
        </div>
      }
      <div className="row">
      {items.map((item, index) => (
        index > 1 && (
          <div className="scalein animation-duration-1000">
            <HomeCard
              title={item.title}
              icon={item.icon}
              destiny={item.destiny}
            />
          </div>)
        ))}
      </div>
    </div>
  );

}
