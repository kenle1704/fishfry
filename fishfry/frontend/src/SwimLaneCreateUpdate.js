import React, { Component } from 'react';

import ApiService from './ApiService';

const apiService = new ApiService();

class SwimLaneCreateUpdate extends Component {
    constructor(props) {
        super(props);
    
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          apiService.getSwimLane(params.pk).then((c)=>{
            this.refs.plateNumber.value = c.plate_number;
            this.refs.swimlaneType.value = c.swimlane_type;
            this.refs.description.value = c.description;
          })
        }
      }

      handleCreate(){
        apiService.createSwimLane(
          {
            "plate_number": this.refs.plateNumber.value,
            "swimlane_type": this.refs.swimlaneType.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          alert("SwimLane created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        apiService.updateSwimLane(
          {
            "pk": pk,
            "plate_number": this.refs.plateNumber.value,
            "swimlane_type": this.refs.swimlaneType.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("SwimLane updated!");
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
              SwimLane Type:</label>
              <input className="form-control" type="text" ref='swimlaneType'/>
            
            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>
              

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default SwimLaneCreateUpdate;
