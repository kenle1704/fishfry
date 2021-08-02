import React, { Component } from 'react';
import ApiService from './ApiService';

const apiService = new ApiService();

class GuidesList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      guides: [],
      nextPageURL: ''

    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    
  }  
  componentDidMount() {
    var self = this;
    apiService.getGuides().then(function (result) {
      console.log(result);
      self.setState({ guides: result.data, nextPageURL: result.nextlink})
    });
  }

  handleDelete(e,pk){

    var self = this;
    apiService.deleteGuide({pk : pk}).then(()=>{
      var newArr = self.state.guides.filter(function(obj) {
        return obj.pk !== pk;
      });

      self.setState({guides: newArr})
    });
    
  }
  
  nextPage(){
    var self = this;
    console.log(this.state.nextPageURL);
    apiService.getGuidesByURL(this.state.nextPageURL).then((result) => {

      self.setState({ guides: result.data, nextPageURL: result.nextlink})

    });      
    
  }

  render() {
    return (
      <div className="guides--list">
          <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Plate Number</th>
            <th>Guide Type</th>
            <th>Description</th>   
            <th>Actions</th>   
          </tr>
          </thead>

            <tbody>
            {this.state.guides.map( c =>

              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.plate_number}</td>
                <td>{c.guide_type}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=> this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/guide/" + c.pk}> Update</a> 
                </td>
              </tr>)}
              </tbody>
          </table>  
          <button className="btn btn-primary" onClick={ this.nextPage }>Next</button>

      </div>
    );
  }
}

export default GuidesList;
