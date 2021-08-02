import React, { Component } from 'react';
import ApiService from './ApiService';
const apiService = new ApiService();
class BoatServiceCreateUpdate extends Component {
    	constructor(props) {
        	super(props);
    
        	//this.handleChange = this.handleChange.bind(this);
        	this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
          		boats: [],
			guides:[],
			swimlanes:[],
			selectedBoat:0,
			selectedGuide:0,
			selectedSwimLane:0
        	}
		this.handleBoatChange = this.handleBoatChange.bind(this);
		this.handleGuideChange = this.handleGuideChange.bind(this);
		this.handleSwimLaneChange = this.handleSwimLaneChange.bind(this);
	}

      	componentDidMount(){
        	const { match: { params } } = this.props;
		if(!params.pk) params.pk=0; // pk=0 mean create new 
          	apiService.getBoatService(params.pk).then((c)=>{
            		this.refs.boat.value = (c.data.boat)?c.data.boat:0;
			this.refs.guide.value = (c.data.guide)?c.data.guide:0;
			this.refs.swimlanes.value = (c.data.swimlanes)?c.data.swimlanes:0;
			this.refs.description.value = (c.data.description)?c.data.description:"";
			this.setState({
				boats:c.boats,
				guides:c.guides,
				swimlanes:c.swimlanes,
				selectedBoat:c.data.boat,
				selectedGuide:c.data.guide,
				selectedSwimLane:c.data.swimlanes,
			});
          	})
      }

      handleCreate(){
        apiService.createBoatService(
        {
		"boat":this.refs.boat.value,
		"guide":this.refs.guide.value,
            	"swimlanes": this.refs.swimlanes.value,
		"description":this.refs.description.value
        }          
        ).then((result)=>{
          alert("BoatService created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        apiService.updateBoatService(
        {
            	"pk": pk,
        	"boat":this.refs.boat.value,
                "guide":this.refs.guide.value,
                "swimlanes": this.refs.swimlanes.value,
                "description":this.refs.description.value
	}          
        ).then((result)=>{
          console.log(result);
          alert("BoatService updated!");
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

      handleBoatChange(e){
	this.setState({selectedBoat:e.target.value});
      }
      handleGuideChange(e){
        this.setState({selectedGuide:e.target.value});
      }
      handleSwimLaneChange(e){
	this.setState({selectedSwimLane:e.target.value});
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            	<label>	Boat:</label>
			<select value={this.state.selectedBoat} onChange={this.handleBoatChange} name="boat" id="boat" ref="boat" className="form-control">
				{this.state.boats.map(d => (<option key={d.pk} value={d.pk}>{d.plate_number}</option>)) }
           		</select> 
            	 <label> Guide:</label>
                        <select value={this.state.selectedGuide} onChange={this.handleGuideChange} name="guide" id="guide" ref="guide" className="form-control">
                                {this.state.guides.map(d => (<option key={d.pk} value={d.pk}>{d.first_name} {d.last_name}</option>)) }
                        </select>
		<label> SwimLane:</label>
                        <select value={this.state.selectedSwimLane} onChange={this.handleSwimLaneChange} name="swimlanes" id="swimlanes" ref="swimlanes" className="form-control">
                                {this.state.swimlanes.map(d => (<option key={d.pk} value={d.pk}>{d.name}</option>)) }
                        </select>
            	<label> Description:</label>
              		<textarea className="form-control" ref='description' ></textarea>
		<input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default BoatServiceCreateUpdate;
