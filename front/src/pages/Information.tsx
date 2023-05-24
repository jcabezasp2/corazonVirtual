import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import logoMonte from "./../img/logo_monte_naranco.png";
import { Image } from "primereact/image";

class Iprops {}

export default function Information(props: Iprops) {
  const navigate = useNavigate();

  return (
    <div id="informationView">
      <table className="tableInformation">
        <tr>
          <th>Participan</th>
          <th>Equipo de desarrollo</th>
          <th>Tecnologias</th>
        </tr>
        <tr>
          <td>
            <Image
              onClick={() =>
                window.location.replace(
                  "https://alojaweb.educastur.es/web/iesmontenaranco"
                )
              }
              src="./src/img/logo_monte_naranco.png"
              alt="Logotipo del instituto Monte Naranco"
            />
          </td>
        </tr>
        <tr>
          <td>
            <Image
              onClick={() =>
                window.location.replace("https://www.iesaglinares.com/")
              }
              width={"auto"}
              src="./src/img/logo_augusto.png"
              alt="Logotipo del instituto Monte Naranco"
            />
          </td>
        </tr>
        <tr>
          <td>
            <Image
              onClick={() =>
                window.location.replace("https://hvvaldecilla.es/")
              }
              src="./src/img/logo_valdecilla.png"
              alt="Logotipo del Hospital Virtual Valdecilla"
            />
          </td>
        </tr>
        <tr>
          <td>
            <Image
              onClick={() => window.location.replace("https://fpempresa.net/")}
              src="./src/img/logo_fpempresa.jpeg"
              alt="Logotipo del fp empresa"
            />
          </td>
        </tr>
        <tr>
          <td>
            <Image
              onClick={() =>
                window.location.replace("https://www.caixabankdualiza.es/")
              }
              src="./src/img/logo_dualiza.jpg"
              alt="Logotipo de dualiza"
            />
          </td>
        </tr>
      </table>
    </div>
  );
}
