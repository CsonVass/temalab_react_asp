import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Column from './column';
import * as api from './api';
import PropTypes from 'prop-types';

class Table extends React.Component {

    constructor(props){
        super(props)
        this.state={
            columns: props.columns,
            colOffset: props.colOffset,
            taskOffset: props.taskOffset
        }
    }

    static get propTypes(){
        return {
            columns: PropTypes.array,
            colOffset: PropTypes.number,
            taskOffset: PropTypes.number
        }
    }

    findColumnKeyById(colId){
        var id = -1;
        Object.keys(this.state.columns).forEach(col => {
            if(parseInt(this.state.columns[col]["id"]) === parseInt(colId)){
                id = col;
            }
        })
        return id;
    }

    addColumn(){
        let newJson = this.state.columns
        let newColumn = {
            "name": `New Column`,
            "todoItems": []
         }       
         
        api.postColumn(newColumn).then(data => {

        newColumn["id"] = data["id"]


        if(this.state.colOffset == 1){
            this.setState({
                colOffset: newColumn["id"]
            })
        }

        newJson[this.state.colOffset]  = newColumn
        this.setState({
            columns: newJson,
            colOffset: this.state.colOffset + 1
        })
    })
        
        
    }

    deleteColumn(colId){            
        let newJson = this.state.columns    
        delete newJson[this.findColumnKeyById(colId)]
        this.setState({
            columns: newJson
        });        
        api.deleteColumn(colId);
    }

    editColumn(colId, newName){
        let newJson = this.state.columns
        newJson[this.findColumnKeyById(colId)]["name"] = newName
        this.setState({
            columns: newJson
        })
        api.putColumn(newJson[this.findColumnKeyById(colId)])
    }

    
    dragged(colId, currentPos, newPos){        
        let newJson = this.state.columns
        
        let tmp = newJson[this.findColumnKeyById(colId)]["todoItems"][currentPos]
        newJson[this.findColumnKeyById(colId)]["todoItems"].splice(currentPos, 1)
        newJson[this.findColumnKeyById(colId)]["todoItems"].splice(newPos, 0, tmp)

        Object.keys(newJson[this.findColumnKeyById(colId)]["todoItems"]).forEach(t => {
            newJson[this.findColumnKeyById(colId)]["todoItems"][t]["priority"] = parseInt(t) 
            api.putTodoItem(newJson[this.findColumnKeyById(colId)]["todoItems"][t], parseInt(t), colId, colId);
        })

        this.setState({
           columns: newJson
        })

    }



    addTask(colId){
        let date = new Date();
        const [month, day, year]  = [String(date.getMonth() +1).padStart(2, '0'), String(date.getDate()).padStart(2, '0'), date.getFullYear()]; 
        
        let newJson = this.state.columns
        let newTask = {
            "name": `New Task`,
            "dueDate": `${year}-${month}-${day}`,
            "description": "-"
        }
        

        api.postTodoItem(newTask, this.state.taskOffset, colId).then(data => {

            newTask["id"] = data["id"]

            
        if(this.state.taskOffset == 1){
            this.setState({
                taskOffset: newTask["id"]
            })
        }

            
            newJson[this.findColumnKeyById(colId)]["todoItems"].push(newTask)

            this.setState({
                columns: newJson,
                taskOffset: this.state.taskOffset + 1
            })
        })

        

    }

    deleteTask(colId, taskId){
        let newJson = this.state.columns
        let idx = 0
        for (let i = 0; i < newJson[this.findColumnKeyById(colId)]["todoItems"].length; i++){
            if( newJson[this.findColumnKeyById(colId)]["todoItems"][i]["id"] === taskId){
                idx = i
                break
            }
        }
        newJson[this.findColumnKeyById(colId)]["todoItems"].splice(idx,1)
        this.setState({
            columns: newJson
        })

        api.deleteTodoItem(colId, taskId);

    }

    editTask(colId, taskId, taskName, taskDeadline, taskDescription, newColId){
        let newJson = this.state.columns
        let idx = 0
        for (let i = 0; i < newJson[this.findColumnKeyById(colId)]["todoItems"].length; i++){
            if( newJson[this.findColumnKeyById(colId)]["todoItems"][i]["id"] === taskId){
                idx = i
                break
            }
        }

        

        if (this.findColumnKeyById(newColId) !== this.findColumnKeyById(colId)){
            newJson[this.findColumnKeyById(newColId)]["todoItems"].push({})
            newJson[this.findColumnKeyById(colId)]["todoItems"].splice(idx, 1)
            idx = newJson[this.findColumnKeyById(newColId)]["todoItems"].length - 1
        }

        
        newJson[this.findColumnKeyById(newColId)]["todoItems"][idx]["id"] = taskId
        newJson[this.findColumnKeyById(newColId)]["todoItems"][idx]["name"] = taskName
        newJson[this.findColumnKeyById(newColId)]["todoItems"][idx]["dueDate"] = taskDeadline
        newJson[this.findColumnKeyById(newColId)]["todoItems"][idx]["description"] = taskDescription

              

        this.setState({
            columns: newJson
        })

        
        api.putTodoItem(newJson[this.findColumnKeyById(newColId)]["todoItems"][idx], idx, parseInt(colId), parseInt(newColId))
        
    }

    render() {   

        let columnsToRender = []
        let keys = Object.keys(this.state.columns)
        let colNames = []

        keys.forEach(key => {
            colNames.push({
                "id" : this.state.columns[key]["id"],
                "name" : this.state.columns[key]["name"]
            })
        })

        keys.forEach(key_ => {
            columnsToRender.push(
                <Col align="center" key={`${key_}${this.state.columns[key_]["name"]}`}>                    
                        <Column key={key_}
                            id = {this.state.columns[key_]["id"]}
                            name = {this.state.columns[key_]["name"]}   
                            tasks = {this.state.columns[key_]["todoItems"]}     
                            deleteColumnCallback = {(colId) => this.deleteColumn(colId)}
                            editColumnCallback = {(colId, colName) => this.editColumn(colId, colName)}
                            draggedCallback = {(colId, currentPos, newPos) => this.dragged(colId, currentPos, newPos)}

                            addTaskCallback = {(colId) => this.addTask(colId)}                            

                            deleteTaskCallback = {(colId, taskId) => this.deleteTask(colId, taskId)}
                            editTaskCallback = {(colId, taskId, taskName, taskDeadline, taskDescription, taskNewCol) => this.editTask(colId, taskId, taskName, taskDeadline, taskDescription, taskNewCol)}

                            colList = {colNames}
                        /> 
                    </Col>
            )
        });
       

        return (
            <Container className="table table-striped" >
                <Row>
                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button key="button" 
                        variant="outlined-primary"
                        onClick={()=> this.addColumn()}
                        >New Column                            
                        </Button>
                        </div>
                
                    {columnsToRender}
                </Row>                   
                
            </Container>
        );
    }
}
export default Table;