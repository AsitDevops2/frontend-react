import React from 'react';
import { connect } from 'react-redux';
import BubbleChart from './BubbleChart';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import { productActions } from '../../_actions';

class ChartPage extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      bar:[],
      bubble:[],
      options:{
        title: 'Product Stock Chart',
        colors: ['#FF5733','#DE3163','#2ECC71','#F1C40F','#b0120a','#40E0D0','#ffab91','#3498DB','#EB984E'],
        hAxis: { title: 'Category', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 1 ,title:"Quantity"},
        chartArea: { width: '50%', height: '70%' },
        lineWidth: 5
      },
    }
  }

  componentDidMount() {
    this.props.getChartData();
  }
  componentWillReceiveProps(nextProps) {
       if( nextProps.products.products && Array.isArray(nextProps.products.products) && nextProps.products.products != this.state.data){
        let arr = nextProps.products.products;
        let bar =[["Category","Quantity"]];
        let bubble =[["product","Quantity","Category"]];

        arr.forEach(row => {
          bar.push([row._id,row.quantity]);
          bubble.push([row.product,row.quantity,row._id]);
        });
        this.setState({bar:bar,bubble:bubble});
       }
  }


  render() {
    return (
      <div className="container">
        <div>
          <div className="row">
            <div className="col-md-6 card">
              <h5 className="card-header">Bar Chart</h5>
              <BarChart className="card-body" data={this.state.bar} options={this.state.options}/>
            </div>
            <div className="col-md-6 card">
            <h5 className="card-header">Pie Chart</h5>
              <PieChart className="card-body" data={this.state.bar} options={this.state.options}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 card">
            <h5 className="card-header">Column Chart</h5>
              <ColumnChart className="card-body" data={this.state.bar} options={this.state.options}/>
            </div>
            <div className="col-md-6 card">
            <h5 className="card-header">Area Chart</h5>
              <AreaChart className="card-body" data={this.state.bar} options={this.state.options}/>
            </div>
          </div>
        </div>
      </div>
    );

  }

}
function mapState(state) {
  const { products } = state;
  return { products };
}


const actionCreators = {
  getChartData: productActions.getChartData,
}

const connectedChartPage = connect(mapState, actionCreators)(ChartPage);
export { connectedChartPage as ChartPage };
