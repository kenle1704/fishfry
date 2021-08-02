import React, { Component } from 'react';

import ApiService from './ApiService';

const apiService = new ApiService();

class BoatCreateUpdate extends Component {
    constructor(props) {
        super(props);
    
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          apiService.getBoat(params.pk).then((c)=>{
            this.refs.plateNumber.value = c.plate_number;
            this.refs.boatType.value = c.boat_type;
            this.refs.description.value = c.description;
          })
        }
      }

      handleCreate(){
        apiService.createBoat(
          {
            "plate_number": this.refs.plateNumber.value,
            "boat_type": this.refs.boatType.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          alert("Boat created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        apiService.updateBoat(
          {
            "pk": pk,
            "plate_number": this.refs.plateNumber.value,
            "boat_type": this.refs.boatType.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("Boat updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Plate Number:</label>
              <input className="form-control" type="text" ref='plateNumber' />
            
            <label>
              Boat Type:</label>
              <input className="form-control" type="text" ref='boatType'/>
            
            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>
              

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default BoatCreateUpdate;
