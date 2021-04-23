import React from "react";
import Chart from "react-google-charts";


function PieChart(props) {
    const data = props.data;
      const options = props.options;
    return (
      <div>
        <Chart
          chartType="PieChart"
          width="100%"
          height="200px"
          data={data}
          options={options}
        />
      </div>
    );
  
}
export default PieChart;