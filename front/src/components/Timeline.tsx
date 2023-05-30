import React from "react";
import { Timeline as ItimeLine } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

class Iprops {
  value: any;
  selected!: number;
}

interface IStep {
  name: string;
  icon: string;
  color: string;
  image: string;
  previousStep: boolean;
}

export default function Timeline(props: Iprops) {
  const navigate = useNavigate();

  const initialize = async () => {
    console.log(props.value);
    const steps: IStep[] = props.value.map((item: any, index: number) => {
        return {
            name: item.name,
            image: item.image,
            icon: item.previousStep ? "pi pi-calendar" : "pi pi-heart",
            color: item.previousStep ? "#4caf50" : "#007ad9",
            };
        });

    setSteps(steps);
    };

    React.useEffect(() => {
        let currentSteps = [...steps];
        currentSteps.shift();
        setSteps([...currentSteps]);
        console.log('steps', steps)

    }, [props.selected]);

  const [steps, setSteps] = React.useState<IStep[]>([]);

  React.useEffect(() => {
    initialize();
  }, []);

  const customizedMarker = (item: IStep) => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };

  const customizedContent = (item: IStep) => {
    return (
      <Card title={item.name}>
      </Card>
    );
  };

  return (
    <>
      <ItimeLine
        align="alternate"
        value={steps}
        marker={customizedMarker}
        content={customizedContent}
      />
    </>
  );
}
