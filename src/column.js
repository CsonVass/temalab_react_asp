import React from 'react';
import Task from './task';
import { Button } from '@mui/material';

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            offset: 0            
        }
    }

    addTask() {      
          let date = new Date();
          const [month, day, year]  = [String(date.getMonth() +1).padStart(2, '0'), String(date.getDate()).padStart(2, '0'), date.getFullYear()];        
        
           let newtask = <Task key={`${this.state.name}.${this.state.offset + 1}`}
                name={`New Task #${this.state.offset + 1}`}
                stateOfTask={this.state.name}
                deleteTask={(task) => this.props.deleteTask(task)}
                deadline={`${year}-${month}-${day}`}
                description={"-"}
                step={(task, amount) =>this.props.step(task, amount)}
                changeState={this.props.changeState}
            />
        this.props.add(newtask)
        this.setState({offset: this.state.offset + 1})
        
    }


    render() {

        return (
            <div className="column">
                <h1 className="column_name" >{this.state.name}</h1>
                <div className="column_buttons">
                    <Button 
                        variant="contained" 
                        color="success"
                        onClick={() => this.addTask()}>+
                    </Button>
                </div>
                <div>{this.props.tasks}</div>
            </div>
        );
    }
}
export default Column;