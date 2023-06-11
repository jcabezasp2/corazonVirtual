import { Button } from "primereact/button";
import React from "react";
import { useHref, useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import logo1 from "../img/logo1.png";
import logoIcon from "../img/heart-pulse-solid.svg";
import Icon from "./Icons";
import { Icons } from "../assets/constants";
import MenuButton from "./MenuButton";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "../css/logohome.css";
export default function LogoHome() {
  const navigate = useNavigate();

  const context = React.useContext(appContext);

  const [subtittle, setSubtittle] = React.useState<string>("");

  React.useEffect(() => {
    let path = window.location.pathname;

    let parts = path.split("/");
    parts = parts.filter((part) => !/\d/.test(part));

    path = parts.join("/");

    switch (path) {
      case "/":
        setSubtittle("");
        break;
      case "/herramientas":
        setSubtittle("Utensilios");
        break;
      case "/panel":
        setSubtittle("Panel de usuario");
        break;
      case "/herramientas":
        setSubtittle("Utensilios");
        break;
      case "/herramientas/formulario":
        setSubtittle("Formulario de utensilios");
        break;
      case "/practicas":
        setSubtittle("Prácticas");
        break;
      case "/procedimientos":
        setSubtittle("Procedimientos");
        break;
      case "/procedimientos/formulario":
        setSubtittle("Formulario de procedimientos");
        break;
      case "/informacion":
        setSubtittle("Información");
        break;
      case "/estudiantes":
        setSubtittle("Estudiantes");
        break;
      case "/pasos":
        setSubtittle("Pasos");
        break;
      case "/pasos/formulario":
        setSubtittle("Formulario de pasos");
        break;
      case "/admin/usuarios":
        setSubtittle("Usuarios");
        break;
      case "/admin/permisos":
        setSubtittle("Permisos");
        break;
      case "/admin/roles":
        setSubtittle("Roles");
        break;
      case "/interactivo":
        setSubtittle("Modo interactivo");
        break;
      
      default: 
        setSubtittle("");
        break;
    }


  }, [window.location.pathname]);

  return (
    <div className="logo">
      <div>
        {
          <div
            className="logo1"
            onClick={() => {
              navigate("/");
            }}
          >
            <Icon type={Icons.Logo} />
            <h1>CoRAzón Virtual</h1>
          </div>
        }
        <h2 id="where">{subtittle}</h2>
      </div>
      <MenuButton />
    </div>
  );
}
