import React, { Component } from 'react';
import ApiService from './ApiService';

const apiService = new ApiService();

class BoatsList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      boats: [],
      nextPageURL: ''

    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    
  }  
  componentDidMount() {
    var self = this;
    apiService.getBoats().then(function (result) {
      console.log(result);
      self.setState({ boats: result.data, nextPageURL: result.nextlink})
    });
  }

  handleDelete(e,pk){

    var self = this;
    apiService.deleteBoat({pk : pk}).then(()=>{
      var newArr = self.state.boats.filter(function(obj) {
        return obj.pk !== pk;
      });

      self.setState({boats: newArr})
    });
    
  }
  
  nextPage(){
    var self = this;
    console.log(this.state.nextPageURL);
    apiService.getBoatsByURL(this.state.nextPageURL).then((result) => {

      self.setState({ boats: result.data, nextPageURL: result.nextlink})

    });      
    
  }

  render() {
    return (
      <div className="boats--list">
          <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Plate Number</th>
            <th>Boat Type</th>
            <th>Description</th>   
            <th>Actions</th>   
          </tr>
          </thead>

            <tbody>
            {this.state.boats.map( c =>

              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.plate_number}</td>
                <td>{c.boat_type}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=> this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/boat/" + c.pk}> Update</a> 
                </td>
              </tr>)}
              </tbody>
          </table>  
          <button className="btn btn-primary" onClick={ this.nextPage }>Next</button>

      </div>
    );
  }
}

export default BoatsList;
