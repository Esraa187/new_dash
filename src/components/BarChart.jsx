import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController
);

const BarChart = () => {
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
            {
                label: 'Data Series 1',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [12, 19, 3, 5, 2],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                border: { dash: [6, 6], display: true },
                grid: {
                    display: true // Display grid lines for the y-axis
                },
                ticks: {
                    padding: 15
                }
            },
            x: {
                beginAtZero: true,
                border: { display: true },
                grid: {
                    display: false // No display of grid lines for the x-axis
                },
                ticks: {
                    padding: 7
                }
            }
        },
        
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
