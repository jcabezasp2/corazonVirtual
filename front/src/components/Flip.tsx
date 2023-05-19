import React from "react";
import { useNavigate } from "react-router-dom";
import ReactCardFlip from 'react-card-flip';
import { Role, Icons } from "../assets/constants";
import Icon from "./../components/Icons";
import "../css/loggedHome.css"
import HomeCard from "./HomeCard";

class Iprops {

}


export default function Flip(props : Iprops) {
  const navigate = useNavigate();

  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div>
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div onMouseEnter={()=>{ setIsFlipped(!isFlipped)}}>
        <HomeCard
          title={"Panel de usuario"}
          icon={Icons.Identity}
          destiny={"/panel"}
        />
        </div>
        <div onMouseLeave={()=>{ setIsFlipped(!isFlipped)}}>
        <HomeCard
          title={"Alfo"}
          icon={Icons.Tools}
          destiny={"/herramientas"}
        />
        </div>
      </ReactCardFlip>
    </div>
  );
}
