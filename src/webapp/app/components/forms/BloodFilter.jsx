import React from 'react';
import BloodType from './BloodType';
import Constants from './../../configs/Constants'

export default class BloodFilter extends React.Component{
    
    constructor(props){
        super(props);
        this.bloodUpdate = this.bloodUpdate.bind(this);
        this.bloodUpdateAll = this.bloodUpdateAll.bind(this);
        this.state = {
            bloodTypes: [] //selected blood types
        }
    }
    
    bloodUpdate(selected, blood){
        var ind = this.state.bloodTypes.indexOf(blood);
        var bloodTypes = this.state.bloodTypes;
        if(ind >= 0) bloodTypes.splice(ind,1);
        else bloodTypes.push(blood);
        
        this.setState({
            bloodTypes: bloodTypes
        });
        
        //send bloodTypes to parent
        if(this.props.onUpdate)
            this.props.onUpdate(this.state.bloodTypes);
    }
    
    bloodUpdateAll(selected){
        //TODO
    }
    
    
    render(){
        
        //group the filters
        var filters = [];
        for(var i=0; i<Constants.BloodTypes.length; i+=2){
            var group = [];
            group.push( <BloodType key={i} 
                onUpdate={this.bloodUpdate} 
                blood={Constants.BloodTypes[i]} 
            />);
            group.push( <BloodType key={i+1} 
                onUpdate={this.bloodUpdate} 
                blood={Constants.BloodTypes[i+1]} 
            />);
            
            filters.push(
                <div className="bloodGroup" 
                    key={i}
                >{group}</div>
            );
        }
        
        return (
            <div className="bloodFilter form-group">
                <div className="bloodFilter-left">
                    {filters}
                </div>
                <div className="bloodFilter-right">
                    <BloodType blood="Te gjithe" 
                        onUpdate={this.bloodUpdateAll} />
                </div>
            </div>
        );
    }
}
