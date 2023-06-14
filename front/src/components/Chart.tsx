import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../css/panel.css';
import { Card } from 'primereact/card';



class Iprops{
    data!: any[];
    title!: string;
    label!: any[];
       
}




export default function ChartLine(props : Iprops) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});   
  
   

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--surface-600');
        const textColorSecondary = documentStyle.getPropertyValue('--surface-800');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-900');
     
 

        
        console.log("Object", Object.values(props.data));
                     
          
          setChartData({

            labels: Object.values(props.data).map((value) => 'Paso '+value.label),
           
            datasets: Object.values(props.data).map((value) => ({
              label: 'Día '+ value.labels.split('T').shift(),
              data: [value.data],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--surface-900'),
              backgroundColor: documentStyle.getPropertyValue('--surface-500'),
              tension: 0.4
            }))
            
          });

        console.log("chartData",chartData)

            
         
        
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1.1,
            plugins: {
                legend: {
                    labels: 
                    {                                   color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        
        setChartOptions(options);
    }, [props.data]);

    return (
        <Card className="col-5 card-panel chart" title={props.title} >
            <Chart id="chart" type="bar" data={chartData} options={chartOptions}>            
            </Chart>
        </Card>
    )
}
        