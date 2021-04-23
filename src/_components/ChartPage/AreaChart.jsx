import React from "react";
import Chart from "react-google-charts";


function AreaChart(props) {
    let data = props.data;
    const options = props.options;
 
    return (
      <div>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="200px"
          data={data}
          options={options}
          
        />
      </div>
    );
  
}
export default AreaChart;
