import React from 'react';
import Column from './column';

class Table extends React.Component {

    constructor(props){
        super(props)
        this.state={
            pending:[],
            inProgress:[],
            done:[],
            canceled:[]
        }
    }

    

    step(task, amount, array){       

        let newOrder = array;
        let task_ = array.find(_task => _task.props.name === task.props.name);
        let idx = newOrder.indexOf(task_);

        if(idx + amount >= 0 && idx + amount < array.length){
            newOrder[idx] = newOrder[idx + amount];
            newOrder[idx + amount] = task_;
        }
        
        this.setState({
            tasks: newOrder
        })
    }

    render() {

        return (
            <div className="table">
                <div className="table-board" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>
                    <div>                         
                        <Column 
                            name = "Pending"   
                            tasks = {this.state.pending}     
                            add = {(task_) => {this.setState({pending: this.state.pending.concat(task_)})}}      
                            deleteTask = {(task_) => this.setState({pending: this.state.pending.filter(_task => _task.props.name !== task_.props.name)
                            }) }    
                            step = {(task, amount) => this.step(task,amount, this.state.pending)}
                        /> 
                    </div>
                    <div>                         
                        <Column 
                            name = "In progress"     
                            tasks = {this.state.inProgress}  
                            add = {(task_) => {this.setState({inProgress: this.state.inProgress.concat(task_)})}}     
                            deleteTask = {(task_) => this.setState({inProgress: this.state.inProgress.filter(_task => _task.props.name !== task_.props.name)
                            }) }                      
                            step = {(task, amount) => this.step(task,amount, this.state.inProgress)}
                        /> 
                    </div>
                    <div>                         
                        <Column 
                            name = "Done"      
                            tasks = {this.state.done}           
                            add = {(task_) => {this.setState({done: this.state.done.concat(task_)})}}            
                            deleteTask = {(task_) => this.setState({done: this.state.done.filter(_task => _task.props.name !== task_.props.name)
                            }) }       
                            step = {(task, amount) => this.step(task,amount, this.state.done)}
                        /> 
                    </div>
                    <div>                         
                        <Column 
                            name = "Canceled"      
                            tasks = {this.state.canceled}         
                            add = {(task_) => {this.setState({canceled: this.state.canceled.concat(task_)})}}       
                            deleteTask = {(task_) => this.setState({canceled: this.state.canceled.filter(_task => _task.props.name !== task_.props.name)
                            }) }      
                            step = {(task, amount) => this.step(task,amount, this.state.canceled)}
                        /> 
                    </div>
                </div>
            </div>
        );
    }
}
export default Table;