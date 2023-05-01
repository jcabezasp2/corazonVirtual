import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Image } from 'primereact/image';
// import {logo1} from '../img/logo1.png';
import '../css/logohome.css';
export default function LogoHome() {

    const navigate = useNavigate(); 


    return (
        <div >           
                
                <Button className=" p-button-icon-only p-button-rounded p-c boxlogo" onClick={()=>navigate('/')}>
                        {/* <Image 
                                width="50em"                          
                               src={logo1}
                               className="p-button-icon logo"
                               alt='CoRAzón Virtual'                               
                            // onClick={()=>{navigate('/')}}
                               /> */}
                   
                </Button>
 
       </div>
    );  
}

