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

  return (
    <div className="logo">
      {(location.pathname == '/' && context.user.role === Role.Guest || location.pathname != '/' ) && <div className="logo1" onClick={() =>{navigate('/')}}>
        <Icon type={Icons.Logo} />
        <h1>CoRAzón <br/> Virtual</h1>
      </div>}


      <MenuButton />
    </div>
  );
}
