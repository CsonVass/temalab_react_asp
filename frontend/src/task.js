import React from 'react';
import { TextField, Button } from '@mui/material';
import './task.css'

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            deadline: this.props.deadline,
            description: this.props.description,
            editing: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    editTask() {
        this.setState({ editing: true })
    }
    saveEdit(task) {
        this.setState({
            editing: false
        })
    }

    handleChange(e) {
        switch (e.target.id) {
            case "name":
                this.setState({
                    name: e.target.value
                })
                break;
            case "deadline":
                this.setState({
                    deadline: e.target.value
                })
                break;
            case "description":
                this.setState({
                    description: e.target.value
                })
                break;
            case "state":
               this.props.changeState(this, e.target.value)
                break;
            default:
                break;
        }

    }


    render() {

        let editState = [<div className="dialogue">
            <TextField

                defaultValue={this.state.name}
                disabled={!this.state.editing}
                autoFocus
                margin="dense"
                id="name"
                label="Name of Task"
                type="plain"
                fullWidth
                variant="standard"
                onChange={this.handleChange}
            />
            <TextField
                defaultValue={this.state.deadline}
                disabled={!this.state.editing}
                id="deadline"
                label="Deadline"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="standard"
                onChange={this.handleChange}
            />
            <TextField
                defaultValue={this.state.description}
                disabled={!this.state.editing}
                id="description"
                label="Description"
                multiline
                fullWidth
                variant="standard"
                onChange={this.handleChange}
            />
{/* 
            <TextField
                id="state"
                label="State"
                select
                fullWidth
                variant="standard"
                onChange={this.handleChange}
            /> */}

            <select id="state"
                 onChange={this.handleChange}
                 defaultValue={this.props.stateOfTask}    >
                <option value="Pending">Pending</option>
                <option value="In progress">In progress</option>
                <option value="Done">Done</option>
                <option value="Canceled">Canceled</option>      
                     
            </select>

            <div className="task_buttons">
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => this.saveEdit(this)}>Save
                </Button>

            </div>
        </div>]

        let savedState = [<div className="task_info">
            <div className="task_name" style={{ fontWeight: "bold" }}>Name: {this.state.name}</div>
            <div className="task_deadline" style={{ fontStyle: "italic" }}>Deadline: {this.state.deadline}</div>
            <div className="task_description" style={{ fontWeight: "plain" }}>Description: {this.state.description}</div>

            <div className="task_buttons">

                <Button
                    variant="contained"
                    onClick={() => this.editTask()}>⚙
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.props.step(this, -1)}>▲
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.props.step(this, +1)}>▼
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={() => this.props.deleteTask(this)}>X
                </Button>
            </div>
        </div>]

        return (
            <div className="task">

                {this.state.editing ? editState : savedState}
            </div>
        );
    }
}
export default Task;