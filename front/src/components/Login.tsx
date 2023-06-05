import { Status } from "../assets/constants";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import "../css/buttons.css";
import "../css/login.css";
import SubmitButton from "../components/form/SubmitButton";
import { appContext } from "../App";
import User from "../models/User";
import { Card } from "primereact/card";

export default function Login() {
  const context = React.useContext(appContext);

  // type datos = React.FormEvent<HTMLFormElement>;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Card className="login ">
      <form>
      <h3 className="h3 text-4xl font-bold text-center ">Iniciar sesión</h3>

      <span className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText
          className="inputtext"
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setEmail(e.currentTarget.value);
            }}}
        />
       
      </span>

      <span className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-at"></i>
        </span>
        <Password
          className="inputtext"
          id="password"
          value={password}
          onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setPassword(e.currentTarget.value);
              context.apiCalls.login();
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          toggleMask
          feedback={false}
        />
       
      </span>
      <div className="button-demo ">
        <div className="template button signin p-p-0">
          {/*                 <Button label='Sign in' className="button signin p-p-0" onClick={handleSubmit}>  
                </Button> */}
          <SubmitButton                   
            onclik={context.apiCalls.login}
            ctx={{ email: email, password: password }}
            isLogin={true}
          />
        </div>
      </div>
      </form>
    </Card>
  );
}
