import React, { Component } from 'react';
import ApiService from './ApiService';
import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'

const apiService = new ApiService();

class BoatServiceList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
	boatservice:undefined,
    	nextPageURL: '',
	numpages:1
    };
    this.nextPage = this.nextPage.bind(this);

    
  }  
  componentDidMount() {
    var self = this;
    apiService.getBoatServices().then(function (result) {
      	self.reconstructBoardData(result);
	self.setState({ nextPageURL: result.nextlink,numpages:result.numpages})
    });
  }
  reconstructBoardData(data){
	var boatservice={};
	boatservice.columns=[];
	// construct swimlanes 
	for( var i in data.swimlanes ) {
		var swimlane = data.swimlanes[i];
		boatservice.columns.push({'id':swimlane.pk,'title':swimlane.name,'cards':[]});
	}
	for( var i in data.data){
		var boat = data.data[i];
		for( var j in boatservice.columns ) {
			var swimlane = boatservice.columns[j];
			var desc = "Guide: " + boat.first_name + " " +boat.last_name + " . Note: " + boat.description;
			if( swimlane['id'] === boat.swimlanes ) boatservice.columns[j].cards.push({'id':boat.pk,'title':boat.plate_number ,'description':desc,'data':boat});  
		}
	}
	this.setState({ boatservice: boatservice});
	return boatservice;
  }
  handleCardRemove(board,column,card){
    apiService.deleteBoatService({pk : card.id}).then(()=>{
    });
    
  }
  handleCardMove(board, card, source,destination){
	  apiService.updateBoatService(
        {
                "pk": card.data.pk,
                "boat":card.data.boat,
                "guide":card.data.guide,
                "swimlanes": destination.toColumnId,
        }
        ).then((result)=>{
          console.log(result);
        }).catch(()=>{
        });
  }
  nextPage(){
    var self = this;
    apiService.getBoatServicesByURL(this.state.nextPageURL).then((result) => {
	self.reconstructBoardData(result);
      	self.setState({ nextPageURL: result.nextlink})

    });      
    
  }

  render() {
	const { boatservice } = this.state;
	  return (boatservice)? ( 
      		<div className="boatservice--list">
	    		<Board  allowRemoveCard
		  		disableColumnDrag
		  		onCardRemove={this.handleCardRemove}
		  		onCardDragEnd={this.handleCardMove} 
		  		initialBoard={this.state.boatservice} />
		  	{this.state.numpages > 1 ? <button className="btn btn-primary" onClick={ this.nextPage }>Next</button>:''}
		</div>
    		) : (<div className="boatservice--list">
                </div>
                );
  }
}

export default BoatServiceList;
