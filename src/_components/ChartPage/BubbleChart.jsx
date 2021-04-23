
import React from "react";
import Chart from "react-google-charts";

function BubbleChart(props) {
    const data = props.data;

    const options={
        title:
          'Correlation between life expectancy, fertility rate ' +
          'and population of some world countries (2010)',
        hAxis: { title: 'Life Expectancy' },
        vAxis: { title: 'Fertility Rate' },
        bubble: { textStyle: { fontSize: 11 } },
      };

    return (
      <div>
        <Chart chartType="BubbleChart" width="100%" height="400px" data={data} />
      </div>
    );
  
    }

export default BubbleChart;