import React from 'react'
import './charts.css'
import BarChart from './BarChart'
import LineChart from './LineChart'
import PieChart from './PieChart'


function Charts() {
    return (
        <div >
            <div className='charts-container'>
                <div className='charts-header'>
                    <div>Drivers</div>
                    <div>Passengers</div>
                    <div>Trips</div>
                </div>
                <div className='charts-content'>
                    <div className="two-charts">
                        <div><BarChart /></div>
                        <div><LineChart /></div>

                    </div>
                    <div className='single-chart'><PieChart /></div>
                </div>
            </div>
        </div>
    )
}

export default Charts
