import React from "react"
import { appContext } from "../App";
import Login from '../components/Login';
import "../css/home.css";
import User from "../models/User";


export default function Home() {

  const context = React.useContext(appContext);


  const initialize = async () => {


  }

  React.useEffect(() => {
    initialize();
  }, [])


  return (   
 
      <div >
          <div className='container grid'>
                          
          <div>

              <div className=" selection:bg-red-500 selection:text-white ">
                  <div className='wrapper'>
                       
                      <div className='cor row'> 
                    
                        <div id="loader" className='row col-12'>
                          
                              <svg id="pachos" className='pacho' viewBox="10 0 310 60">

                                  <path id='pacho' className="st0 pacho" d="M297.5,41.2h-76.6c-0.5,0-0.9,0.4-1,0.8l-1.6,11.3l-3.1-32c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8
                     l-5.3,25.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6l-2.3,4.8h-107c0,0,0,0,0,0H82c-1.6,0-2.2,1.1-2.2,1.6
                     l-1.6,11.3l-3.1-52c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8l-9.3,45.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6
                     l-2.3,4.8H0.5"/>
                              </svg>

                          </div>
                          <div className='corazon col-4'>
                          
                          </div>
                          
                      </div>
                          
                           {context.user.id == 0 && <Login />}
                          
                  </div>
                 
              </div>

          </div>          
        </div>
        </div>
  );
}
