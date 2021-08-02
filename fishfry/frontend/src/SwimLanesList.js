import React, { Component } from 'react';
import ApiService from './ApiService';

const apiService = new ApiService();

class SwimLanesList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      swimlanes: [],
      nextPageURL: ''

    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    
  }  
  componentDidMount() {
    var self = this;
    apiService.getSwimLanes().then(function (result) {
      console.log(result);
      self.setState({ swimlanes: result.data, nextPageURL: result.nextlink})
    });
  }

  handleDelete(e,pk){

    var self = this;
    apiService.deleteSwimLane({pk : pk}).then(()=>{
      var newArr = self.state.swimlanes.filter(function(obj) {
        return obj.pk !== pk;
      });

      self.setState({swimlanes: newArr})
    });
    
  }
  
  nextPage(){
    var self = this;
    console.log(this.state.nextPageURL);
    apiService.getSwimLanesByURL(this.state.nextPageURL).then((result) => {

      self.setState({ swimlanes: result.data, nextPageURL: result.nextlink})

    });      
    
  }

  render() {
    return (
      <div className="swimlanes--list">
          <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Plate Number</th>
            <th>SwimLane Type</th>
            <th>Description</th>   
            <th>Actions</th>   
          </tr>
          </thead>

            <tbody>
            {this.state.swimlanes.map( c =>

              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.plate_number}</td>
                <td>{c.swimlane_type}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=> this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/swimlane/" + c.pk}> Update</a> 
                </td>
              </tr>)}
              </tbody>
          </table>  
          <button className="btn btn-primary" onClick={ this.nextPage }>Next</button>

      </div>
    );
  }
}

export default SwimLanesList;
