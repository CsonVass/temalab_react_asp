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
            dueDate: this.props.dueDate,
            description: this.props.description,
            editing: false,
            newColId: this.props.colId
        }
    }

    sendEdit(){
        this.props.editTaskCallback(this.state.id, this.state.name, this.state.dueDate, this.state.description, this.state.newColId)
        this.setState({editing:false})
    }

    render() {       

        let colListOption = [ ]
        let i = 0
        this.props.colList.forEach(key => {
            colListOption.push(
                <option key={`sel-${this.state.id}-${i++}`} value={key["id"]}>{key["name"]}</option>
            )
        })

        let savedState = [<div key="taskState" className="task_info">
            <h5 key="taskName" className="card-title">{this.state.name}</h5>
            <h6 key="taskDeadline" className="card-subtitle mb-2 text-muted">{this.state.dueDate}</h6>
            <p key="taskDesc" className="card-text">{this.state.description}</p>

            <ButtonToolbar key="btnToolbar" className="justify-content-between">
                <ButtonGroup key="btnGroup1">

                    <Button key="btnEdit"
                        variant="outline-secondary"
                        onClick={() => this.setState({editing:true})}>
                            <i className="bi bi-pencil"></i>
                    </Button>
                </ButtonGroup>
                
                <ButtonGroup key="btnGroup2">
                    <Button key="btndelete"
                        variant="outline-danger"
                        onClick={()=>this.props.deleteTaskCallback()}>
                            <i className="bi bi-trash"></i>
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </div>]

        let editState = [
            <div key="editState" className="dialogue">
                <TextField

                    defaultValue={this.state.name}
                    autoFocus
                    margin="dense"
                    id="name_field"
                    key="name_field"
                    label="Name of Task"
                    type="plain"
                    fullWidth
                    variant="standard"
                    onChange={(e) => this.setState({name: e.target.value})}
                />
                <TextField
                    defaultValue={this.state.dueDate}
                    id="dueDate_field"
                    key="dueDate_field"
                    label="Deadline"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    onChange={(e) => {
                        if(new Date(e.target.value) < new Date("9999-12-30")){
                            this.setState({dueDate: e.target.value})}
                        }
                    }
                />
                <TextField
                    defaultValue={this.state.description}
                    id="description_field"
                    key="description_field"
                    label="Description"
                    multiline
                    fullWidth
                    variant="standard"
                    onChange={(e) => this.setState({description: e.target.value})}
                />

                <select key="selectCol" id="state_field"
                    defaultValue={this.props.colId}  
                    onChange={(e) => this.setState({newColId: e.target.value})}  >
                    {colListOption}  
                        
                </select>

                <div key="btnSave" className="task_buttons">
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