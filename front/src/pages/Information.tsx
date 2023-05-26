import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import "./../css/informationView.css";

class Iprops {}

export default function Information(props: Iprops) {
  const navigate = useNavigate();

  return (
    <div id="informationView">
      <div className="participan">
        <h2>Participan</h2>
        <Card className="card">
          <Image
            onClick={() =>
              window.location.replace(
                "https://alojaweb.educastur.es/web/iesmontenaranco"
              )
            }
            src="./src/img/logo_monte_naranco.png"
            alt="Logotipo del instituto Monte Naranco"
          />
        </Card>
        <Card className="card">
          <Image
            onClick={() =>
              window.location.replace("https://www.iesaglinares.com/")
            }
            width={"auto"}
            src="./src/img/logo_augusto.png"
            alt="Logotipo del instituto Monte Naranco"
          />
        </Card>
        <Card className="card">
          <Image
            onClick={() => window.location.replace("https://hvvaldecilla.es/")}
            src="./src/img/logo_valdecilla.png"
            alt="Logotipo del Hospital Virtual Valdecilla"
          />
        </Card>
        <Card className="card">
          <Image
            onClick={() =>
              window.location.replace("https://www.caixabankdualiza.es/")
            }
            src="./src/img/logo_dualiza.png"
            alt="Logotipo de dualiza"
          />
        </Card>
        <Card className="card">
          <Image
            onClick={() => window.location.replace("https://fpempresa.net/")}
            src="./src/img/logo_fpempresa.png"
            alt="Logotipo del fp empresa"
          />
        </Card>
        <Card className="none"></Card>
      </div>
      <div className="equipo">
        <h2>Equipo de desarrollo</h2>
        <Card
          title="Yerai Montes"
          className="card"
          onClick={() =>
            window.location.replace(
              "https://www.linkedin.com/in/yerai-montes-fernandez-184273192/?originalSubdomain=es"
            )
          }
        />
        <Card
          title="Lara Herrero"
          className="card"
          onClick={() =>
            window.location.replace(
              "https://www.linkedin.com/in/lara-herrero-cerezo-1bb543150/"
            )
          }
        />
        <Card
          title="Javier Cabezas"
          className="card"
          onClick={() =>
            window.location.replace(
              "https://www.linkedin.com/in/javier-c-223a12205/"
            )
          }
        />
        <Card className="none"></Card>
        <Card className="none"></Card>
        <Card className="none"></Card>
      </div>
      <div className="tecnologias">
        <h2>Tecnologias</h2>
        <Card
          className="card"
          onClick={() => window.location.replace("https://es.reactjs.org/")}
        >
          <Image src="./src/img/react.png" alt="Logotipo de react" />
        </Card>
        <Card
          className="card"
          onClick={() =>
            window.location.replace("https://www.primefaces.org/primereact/")
          }
        >
          <Image src="./src/img/prime.png" alt="Logotipo de primereact" />
        </Card>
        <Card
          className="card"
          onClick={() =>
            window.location.replace("https://dotnet.microsoft.com/")
          }
        >
          <Image src="./src/img/net.png" alt="Logotipo de .net" />
        </Card>
        <Card
          className="card"
          onClick={() => window.location.replace("https://www.docker.com/")}
        >
          <Image src="./src/img/docker.png" alt="Logotipo de docker" />
        </Card>
        <Card
            className="card"
            onClick={() => window.location.replace("https://www.typescriptlang.org/")}
        >
            <Image src="./src/img/typescript.png" alt="Logotipo de typescript" />
        </Card>
        <Card
            className="card"
            onClick={() => window.location.replace("https://www.bing.com/ck/a?!&&p=e05d7272941f266bJmltdHM9MTY4NDk3MjgwMCZpZ3VpZD0xYWMwMWJiNy0xNTgzLTY3NjEtMjhjMy0wOWQ3MTQyYjY2M2MmaW5zaWQ9NTIxMA&ptn=3&hsh=3&fclid=1ac01bb7-1583-6761-28c3-09d7142b663c&psq=postgresql&u=a1aHR0cHM6Ly93d3cucG9zdGdyZXNxbC5vcmcv&ntb=1")}
        >
            <Image src="./src/img/postgresql.png" alt="Logotipo de postgreSQL" />
        </Card>
      </div>
    </div>
  );
}
