import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import logo1 from "../img/logo1.png";
import logoIcon from "../img/heart-pulse-solid.svg";
import Icon from "./Icons";
import { Icons } from "../assets/constants";
import MenuButton from "./MenuButton";
import "../css/logohome.css";
export default function LogoHome() {
  const navigate = useNavigate();

  return (
    <div className="logo">
      <div className="logo1" onClick={() =>{navigate('/')}}>
        <Icon type={Icons.Logo} />
        <h1>Corazón <br/> Virtual</h1>
      </div>


      <MenuButton />
    </div>
  );
}
