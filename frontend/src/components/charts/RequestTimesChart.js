import React, { Component} from 'react';
import * as Rx from 'rxjs';
var AmCharts = require("@amcharts/amcharts3-react");

class RequestTimesChart extends Component {
  constructor (props) {
    super(props);
    this.destroy$ = new Rx.Subject();
    this.state = {
      dataProvider: this.generateData(),
      timer: null
    };
  }

  componentDidMount() {
    Rx.Observable
      .interval(1000 * 10)
      .takeUntil(this.destroy$)
      .subscribe(() => {
       this.setState({
         dataProvider: this.generateData()
       });
      });
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }

  generateData() {
    var firstDate = new Date();

    var dataProvider = [];

    for (var i = 0; i < 100; ++i) {
      var date = new Date(firstDate.getTime());

      date.setDate(i);

      dataProvider.push({
        date: date,
        value: Math.floor(Math.random() * 100)
      });
    }

    return dataProvider;
  }
  getChartConfig() {
    return {
      "type": "serial",
      "theme": "light",
      "marginRight": 10,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": false,
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": true
      }],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [{
        "id": "g1",
        "balloon":{
          "drop": true,
          "adjustBorderColor": false,
          "color":"#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color":"#AAAAAA",
        "enabled": false,
      },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable": false
      },
      "valueScrollbar":{
        "oppositeAxis": false,
        "offset":50,
        "scrollbarHeight":10,
        "enabled": false,
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "dataProvider": this.state.dataProvider
    };
  }

  render() {
    return (
      <AmCharts.React
        style={{ width: "100%", height: "40vh" }}
        options={this.getChartConfig()} />
    )
  }

}

export default RequestTimesChart
