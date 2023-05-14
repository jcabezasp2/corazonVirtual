import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import logo1 from "../img/logo1.png";
import logoIcon from "../img/heart-pulse-solid.svg";

import MenuButton from "./MenuButton";
import "../css/logohome.css";
export default function LogoHome() {
  const navigate = useNavigate();

  return (
    <div className="logo">
      <Button
        className="p-buttonLogo p-button-rounded p-c boxlogo"
        onClick={() => navigate("/")}
        link
      >
        <Image
          src={logoIcon}
          width="28em"
          className="p-button-icon logo"
          alt="CoRAzón Virtual"
          onClick={() => navigate("/")}
        />
      </Button>

      <MenuButton />
    </div>
  );
}
