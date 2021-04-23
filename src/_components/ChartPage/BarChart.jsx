import React from "react";
import Chart from "react-google-charts";


function BarChart(props) {
    const data = props.data;
    let op = JSON.parse(JSON.stringify(props.options));
    op.hAxis =props.options.vAxis;
    op.vAxis =props.options.hAxis;
    return (
      <div>
        <Chart chartType="BarChart" width="100%" height="200px" data={data} options={op} />
      </div>
    );
  }


export default BarChart;