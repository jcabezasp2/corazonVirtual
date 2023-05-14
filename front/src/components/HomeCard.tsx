import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { Role, Icons } from "../assets/constants";
import Icon from "./../components/Icons";
import "../css/loggedHome.css"

class Iprops {
    title!: string;
    icon!: Icons;
    destiny!: string;
}


export default function LoggedHome(props : Iprops) {
  const navigate = useNavigate();

  return (
    <div>
    <Card className="loggedCard" onClick={()=>{navigate(props.destiny)}}>
      <Icon type={props.icon}/>
      <h3>{props.title}</h3>
    </Card>
    </div>
  );
}
