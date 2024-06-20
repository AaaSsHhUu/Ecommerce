import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartData,
    ChartOptions,
    PointElement,
    LineElement,
    Filler
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// ------------------------ Bar Chart --------------------------
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
    
    return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />
};

// ------------------------ Doughnut Chart --------------------------

interface DoughnutChartProps{
    labels : string[];
    data : number[];
    backgroundColor : string[];
    cutout ?:  number | string;
    legends ?: boolean;
    offset ?: number[];
}

export const DoughnutChart = ({
    labels,
    data,
    backgroundColor,
    cutout,
    legends = true,
    offset
} : DoughnutChartProps) => {

    const doughnutData : ChartData<"doughnut",number[],string> = {
        labels,
        datasets : [{
          data,
          backgroundColor,
          borderWidth : 0,
          offset
        }],
    };

    const doughnutOptions : ChartOptions<"doughnut"> = {
        responsive : true,
        plugins : {
            legend : {
                display : legends,
                position : "bottom",
                labels : {
                    padding : 40
                }
            }
        },
        cutout
    };

    return (
      <Doughnut data={doughnutData} options={doughnutOptions} />
    )
}

// ------------------------ Pie Chart --------------------------

interface PieChartProps{
    labels : string[];
    data : number[];
    backgroundColor : string[];
    offset ?: number[];
}

export const PieChart = ({
    labels,
    data,
    backgroundColor,
    offset
} : PieChartProps) => {

    const pieData : ChartData<"pie",number[],string> = {
        labels,
        datasets : [{
          data,
          backgroundColor,
          borderWidth : 1,
          offset
        }],
    };

    const pieOptions : ChartOptions<"pie"> = {
        responsive : true,
        plugins : {
            legend : {
                display : false,
            }
        },
    };

    return (
      <Pie data={pieData} options={pieOptions} />
    )
}

// ------------------------ Line Chart --------------------------
interface LineChartProps{
    data : number[];
    label : string;
    backgroundColor : string;
    borderColor : string;
    labels ?: string[];
}

export const LineChart = ({
    data,
    label,
    backgroundColor,
    borderColor,
    labels
} : LineChartProps) => {
    const lineOptions : ChartOptions<"line"> = {
        responsive: true,
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
      
    const lineData : ChartData< "line", number[], string > = {
        labels,
        datasets : [
            {
                fill : true,
                label,
                data,
                backgroundColor,
                borderColor
            }
        ]
    }
    
    return <Line options={lineOptions} data={lineData} />
};