import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['Jan', 'Feb', 'Mar',
           'Apr', 'May',"Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 30, 41, 16,9,20, 81, 56,9,6,9]
    }
  ]
}

const options = {
  title:{
    display:true,
    text:'Average Rainfall per month',
    fontSize:20
  },
  legend:{
    display:true,
    position:'right'
  }
}

export default class BarChart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={options}
        />
      </div>
    );
  }
}
