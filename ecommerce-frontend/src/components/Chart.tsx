import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface BarChartProps{
    horizontal ?: boolean;
    data1 : number[];
    data2 : number[];
    title1 : string;
    title2 : string;
    bgColor1 : string;
    bgColor2 : string;
    labels ?: string[];
}

export const BarChart = ({
    horizontal = false,
    data1 = [],
    data2 = [],
    title1,
    title2,
    bgColor1,
    bgColor2,
    labels = months
} : BarChartProps) => {
    const options : ChartOptions<"bar"> = {
        responsive: true,
        indexAxis : horizontal ? 'y' : 'x', 
        plugins: {
          legend: {
            display : false,
          },
          title: {
            display: false,
          },
        },
        scales : {
            y : {
              beginAtZero : true,
              grid : {
                  display : false
              }
            },
            x : {
                grid : {
                  display : false
                }
            }
        }
      };
      
    const data : ChartData< "bar", number[], string > = {
        labels,
        datasets : [
            {
                label : title1,
                data : data1,
                backgroundColor : bgColor1,
                barThickness : "flex",
                barPercentage : 1,
                categoryPercentage : 0.4
            },
            {
                label : title2,
                data : data2,
                backgroundColor : bgColor2,
                barThickness : "flex",
                barPercentage : 1,
                categoryPercentage : 0.4
            },
        ]
    }
    
    return <Bar options={options} data={data} />
  };

export default BarChart

