import React, { useEffect, useState } from 'react'
import PieChart from './Charts/PieChart'

const Analytics = ({ browsers, devices }) => {
    console.log(devices, 'an')
    return (
        <div className='border mt-10 rounded-md flex justify-between'>
            <PieChart chartData={browsers} title="Browsers" />
            <PieChart chartData={devices} title="Devices" />
        </div>
    )
}

export default Analytics