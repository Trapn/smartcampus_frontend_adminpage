import React, {Component} from 'react';
import axios from 'axios';



class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', roomnumber: '', description: ''};
    
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
      }
      handleChange1(e){
        this.setState({
            name: e.target.value
        })
      }
      handleChange2(e){
        this.setState({
            roomnumber: e.target.value
        })
      }
      handleChange3(e){
        this.setState({
            description: e.target.value
        })
      }
      handleSubmit(e){
        e.preventDefault();
        const locations = {
          name: this.state.name,
          roomnumber: this.state.roomnumber,
          description: this.state.roomnumber
        }
        let uri = 'https://projectwerk2.herokuapp.com/api/locations';
        axios.post(uri, locations).then((response) => {
        });
      }
    
        render() {
          return (
          <div>
            <h1>Add location</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" onChange={this.handleChange1} />
                  </div>
                  <div className="form-group">
                    <label>Roomnumber:</label>
                    <input type="text" className="form-control" onChange={this.handleChange2} />
                  </div>
                </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Description:</label>
                      <textarea className="form-control col-md-6" onChange={this.handleChange3}></textarea>
                    </div>
                  </div>
                </div><br />
                <div className="form-group">
                  <button className="btn btn-primary">Add Location</button>
                </div>
            </form>
      </div>
          )
        }
    }

export default Schedule;