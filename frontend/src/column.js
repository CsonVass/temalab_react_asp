import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Task from './task';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            editing: false
        }
    }

    handleEditClick(newName){
        this.props.editColumnCallback(this.state.id, newName)
        this.setState({editing:false})
    }

    handleOnDragEnd(result){
        if (!result.destination) return;
        this.props.draggedCallback(this.state.id, result.source.index, result.destination.index)
    }


    render() {

        let tasks = []
        let keys = Object.keys(this.props.tasks)
        keys.forEach(key => {
            tasks.push(
                <Card className="card-block" style={{ width: '18rem' }}>
                    <Task key={`${this.state.id}${this.props.tasks[key]["id"]}`}
                        id={this.props.tasks[key]["id"]}
                        name={this.props.tasks[key]["name"]}
                        dueDate={this.props.tasks[key]["dueDate"]}
                        description={this.props.tasks[key]["description"]}
                        deleteTaskCallback={() => this.props.deleteTaskCallback(this.state.id, this.props.tasks[key]["id"])}
                        editTaskCallback = {(taskId, taskName, taskDeadline, taskDescription, newColId) => this.props.editTaskCallback(this.state.id, taskId, taskName, taskDeadline, taskDescription, newColId)}
                        
                        colList = {this.props.colList}
                        colId = {this.state.id}

                    />
                </Card>
            )
        });
        

        let editNameFrom = [
            <Form key={`${this.state.id}edit_form`}>
                <input key="edit_name" type="text" id={`${this.state.id}edit`} defaultValue={this.state.name}></input>
                <button key="button_ok" type="button" className="btn btn-primary" 
                    onClick={() => this.handleEditClick(document.getElementById(`${this.state.id}edit`).value)}>
                        Save
                </button>
            </Form>
        ]

        let savedForm = [
            <div key="savedForm">
            <h1 key="colName" className="column_name">{this.state.name}</h1>
            <div key="colButtons" className="column_buttons">
                    <Button key="button_add"
                        variant="outline-success" 
                        onClick={()=>this.props.addTaskCallback(this.state.id)}>
                         <i className="bi bi-plus"></i>
                    </Button>
                    <Button key="button_edit"
                        variant="outline-warning"
                        onClick={() => this.setState({editing:true})}>
                            <i className="bi bi-pencil"></i>
                    </Button>
                    <Button  key="button_delete"
                        variant="outline-danger"
                        onClick={()=>this.props.deleteColumnCallback(this.state.id)}>
                        <i className="bi bi-trash"></i>
                        
                    </Button>
                    
                </div>
                </div>
        ]


        return (
            <div className="column" key={this.state.id}>
                {this.state.editing ? editNameFrom : savedForm}
                <DragDropContext key="dragdropctx" onDragEnd={(res) => this.handleOnDragEnd(res)}>
                    <Droppable key="dropctx" droppableId="tasks">
                        { (provided) => (
                            <ul key="drul" className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((task, index) => {
                                    return(
                                        <Draggable key={`${task.props.children["key"]}`} draggableId={`${task.props.children["key"]}`}  {...provided.dragHandleProps} index={index}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    {task}
                                                </div>
                                            )}
                                           
                                    </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                         
                        )}

                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}
export default Column;

///https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/