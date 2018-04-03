import React, { Component } from 'react';
import ImageMapper from 'react-image-mapper';
const ReactHighcharts = require('react-highcharts');

class Building extends Component {

	constructor(props) {
		super(props); 

		this.state = {
			MAP: {},
			width: 0,
			data: "data",
			chart: {}
		}

		this.updateDimensions = this.updateDimensions.bind(this);
		this.temp_style = this.temp_style.bind(this);
		this.humid_style = this.humid_style.bind(this);
		this.occup_style = this.occup_style.bind(this);
		this.click_handle = this.click_handle.bind(this);
	}

	updateDimensions() {
		var width = window.innerWidth,
			MAP = {
				name: "my-map",
				areas: [
				  { id: "01", shape: "rect", coords: [width*0.583, width*0.097, width*0.696, width*0.239] },
				  { id: "85", shape: "rect", coords: [width*0.059, width*0.116, width*0.123, width*0.239] },
				  { id: "80", shape: "rect", coords: [width*0.126, width*0.116, width*0.210, width*0.239] },
				  { id: "75", shape: "rect", coords: [width*0.213, width*0.116, width*0.287, width*0.239] },
				  { id: "65", shape: "rect", coords: [width*0.289, width*0.116, width*0.364, width*0.239] }
				]
			}
	
		this.setState({width, MAP});
	}

	componentWillMount() {
		this.updateDimensions();
	}

	componentWillUpdate() {
//		window.location.reload();
	}
	
	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		document.getElementById("chrt").style.display = "none";
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	temp_style() {
		var temp = [];
		var arr = [];
		var margin = 0.075;

		for (var i = 0; i < 5; i++) {
			temp[i] = { position: 'absolute',
						top: this.state.width*0.15,
						left: this.state.width*margin,
						'font-size': this.state.width*0.007,
						'font-weight': 'bold' }
			margin = margin+0.078;
			if (i === 4) {
				temp[i] = { position: 'absolute',
							top: this.state.width*0.13,
							left: this.state.width*0.62,
							'font-size': this.state.width*0.007,
							'font-weight': 'bold' }
			}
			arr[i] = <span style={temp[i]}>TEMP: {this.state.data}</span>
		}

		return arr
	}

	humid_style() {
		var humid = [];
		var arr = [];
		var margin = 0.073;

		for (var i = 0; i < 5; i++) {
			humid[i] = { position: 'absolute',
						top: this.state.width*0.16,
						left: this.state.width*margin,
						'font-size': this.state.width*0.007,
						'font-weight': 'bold' }
			margin = margin+0.078;
			if (i === 4) {
				humid[i] = { position: 'absolute',
							top: this.state.width*0.14,
							left: this.state.width*0.618,
							'font-size': this.state.width*0.007,
							'font-weight': 'bold' }
			}
			arr[i] = <span style={humid[i]}>HUMID: {this.state.data}</span>
		}

		return arr
	}

	occup_style() {
		var occup = [];
		var arr = [];
		var margin = 0.073;

		for (var i = 0; i < 5; i++) {
			occup[i] = { position: 'absolute',
						top: this.state.width*0.17,
						left: this.state.width*margin,
						'font-size': this.state.width*0.007,
						'font-weight': 'bold' }
			margin = margin+0.078;
			if (i === 4) {
				occup[i] = { position: 'absolute',
							top: this.state.width*0.15,
							left: this.state.width*0.618,
							'font-size': this.state.width*0.007,
							'font-weight': 'bold' }
			}
			arr[i] = <span style={occup[i]}>OCCUP: {this.state.data}</span>
		}
		
		return arr
	}

	click_handle(area) {
		var chart = {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Temperature history for room ' + area.id
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					month: '%e. %b',
					year: '%b'
				},
				title: {
					text: 'Date'
				}
			},
			yAxis: {
				title: {
					text: 'Temperature'
				},
				min: 0
			},
			plotOptions: {
				spline: {
					marker: {
						enabled: true
					}
				}
			},
			series: [{
				name: 'Winter 2013-2014',
				data: [
					[Date.UTC(1970, 9, 29), 0],
					[Date.UTC(1970, 10, 9), 0.4],
					[Date.UTC(1970, 11, 1), 0.25],
					[Date.UTC(1971, 0, 1), 1.66],
					[Date.UTC(1971, 0, 10), 1.8],
					[Date.UTC(1971, 1, 19), 1.76],
					[Date.UTC(1971, 2, 25), 2.62],
					[Date.UTC(1971, 3, 19), 2.41],
					[Date.UTC(1971, 3, 30), 2.05],
					[Date.UTC(1971, 4, 14), 1.7],
					[Date.UTC(1971, 4, 24), 1.1],
					[Date.UTC(1971, 5, 10), 0]
				]
			}]
		};

		document.getElementById("chrt").style.display = "initial";

		this.setState({chart})
	}

	//<img src={require("../img/floor.svg")} className="img-fluid floor" alt="Responsive image"></img>
	//<ImageMapper src={require("../img/floor_plan.svg")} map={MAP} width={this.state.width} fillColor={"rgba(141, 128, 229, 0.6)"}/>

	render() {
	    return (
			<div className="box">
				<ImageMapper src={require("../img/floor_plan.svg")}
							map={this.state.MAP}
							width={this.state.width*0.7}
							fillColor={"rgba(141, 128, 229, 0.3)"}
							onClick={(this.state.MAP.areas, this.click_handle)}/>
				{this.temp_style()}
				{this.humid_style()}
				{this.occup_style()}
				<div className="chrt" id="chrt" key="chrt">
					<ReactHighcharts config = {this.state.chart}></ReactHighcharts>
				</div>
			</div>
	    );
	}
}

export default Building;