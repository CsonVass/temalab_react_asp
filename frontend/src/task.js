import React from 'react';
import { TextField } from '@mui/material';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            deadline: this.props.deadline,
            description: this.props.description,
            editing: false,
            newColId: this.props.colId
        }
    }

    sendEdit(){
        this.props.editTaskCallback(this.state.id, this.state.name, this.state.deadline, this.state.description, this.state.newColId)
        this.setState({editing:false})
    }

    render() {       

        let colListOption = [ ]
        this.props.colList.forEach(key => {
            colListOption.push(
                <option value={key["key"]}>{key["name"]}</option>
            )
        })

        let savedState = [<div className="task_info">
            <h5 className="card-title">{this.state.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.state.deadline}</h6>
            <p className="card-text">{this.state.description}</p>

            <ButtonToolbar className="justify-content-between">
                <ButtonGroup>

                    <Button
                        variant="outline-secondary"
                        onClick={() => this.setState({editing:true})}>
                            <i className="bi bi-pencil"></i>
                    </Button>
                </ButtonGroup>
                
                <ButtonGroup>
                    <Button
                        variant="outline-danger"
                        onClick={()=>this.props.deleteTaskCallback()}>
                            <i className="bi bi-trash"></i>
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </div>]

        let editState = [
            <div className="dialogue">
                <TextField

                    defaultValue={this.state.name}
                    autoFocus
                    margin="dense"
                    id="name_field"
                    label="Name of Task"
                    type="plain"
                    fullWidth
                    variant="standard"
                    onChange={(e) => this.setState({name: e.target.value})}
                />
                <TextField
                    defaultValue={this.state.deadline}
                    id="deadline_field"
                    label="Deadline"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    onChange={(e) => this.setState({deadline: e.target.value})}
                />
                <TextField
                    defaultValue={this.state.description}
                    id="description_field"
                    label="Description"
                    multiline
                    fullWidth
                    variant="standard"
                    onChange={(e) => this.setState({description: e.target.value})}
                />

                <select id="state_field"
                    defaultValue={this.props.colId}  
                    onChange={(e) => this.setState({newColId: e.target.value})}  >
                    {colListOption}  
                        
                </select>

                <div className="task_buttons">
                <Button type="button" className="btn btn-primary" 
                    onClick={() => this.sendEdit()}>
                        Save
                </Button>

                </div>
            </div>]

        return (
               this.state.editing ? editState : savedState
        );
    }


}
export default Task;