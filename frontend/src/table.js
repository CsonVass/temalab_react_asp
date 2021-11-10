import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Column from './column';

class Table extends React.Component {

    constructor(props){
        super(props)
        this.state={
            columns: {},
            colOffset: 0,
            taskOffset: 0
        }
    }

    addColumn(){
        let newJson = this.state.columns
        newJson[this.state.colOffset] = {
            "name": `New Column ${this.state.colOffset}`,
            "tasks": []
         }
        this.setState({
            columns: newJson,
            colOffset: this.state.colOffset + 1
        })
    }

    deleteColumn(colId){
        let newJson = this.state.columns
        delete newJson[colId]
        this.setState({
            columns: newJson
        })
    }

    editColumn(colId, newName){
        let newJson = this.state.columns
        newJson[colId]["name"] = newName
        this.setState({
            columns: newJson
        })
    }

    
    dragged(colId, currentPos, newPos){        
        let newJson = this.state.columns
        
        let tmp = newJson[colId]["tasks"][currentPos]
        newJson[colId]["tasks"].splice(currentPos, 1)
        newJson[colId]["tasks"].splice(newPos, 0, tmp)

        this.setState({
           columns: newJson
        })
    }



    addTask(colId){
        let date = new Date();
        const [month, day, year]  = [String(date.getMonth() +1).padStart(2, '0'), String(date.getDate()).padStart(2, '0'), date.getFullYear()];  

        let newJson = this.state.columns
        newJson[colId]["tasks"].push( {
            "id": this.state.taskOffset,
            "name": `New Task ${this.state.taskOffset}`,
            "deadline": `${year}-${month}-${day}`,
            "description": "-"
        })

        this.setState({
            columns: newJson,
            taskOffset: this.state.taskOffset + 1
        })

    }

    deleteTask(colId, taskId){
        let newJson = this.state.columns
        let idx = 0
        for (let i = 0; i < newJson[colId]["tasks"].length; i++){
            if( newJson[colId]["tasks"][i]["id"] === taskId){
                idx = i
                break
            }
        }
        newJson[colId]["tasks"].splice(idx,1)
        this.setState({
            columns: newJson
        })

    }

    editTask(colId, taskId, taskName, taskDeadline, taskDescription, newColId){
        let newJson = this.state.columns
        let idx = 0
        for (let i = 0; i < newJson[colId]["tasks"].length; i++){
            if( newJson[colId]["tasks"][i]["id"] === taskId){
                idx = i
                break
            }
        }

        

        if (newColId !== colId){
            newJson[newColId]["tasks"].push({})
            newJson[colId]["tasks"].splice(idx, 1)
            idx = newJson[newColId]["tasks"].length - 1
        }

        
        newJson[newColId]["tasks"][idx]["name"] = taskName
        newJson[newColId]["tasks"][idx]["deadline"] = taskDeadline
        newJson[newColId]["tasks"][idx]["description"] = taskDescription

              

        this.setState({
            columns: newJson
        })
        
    }

    render() {        

        let columnsToRender = []
        let keys = Object.keys(this.state.columns)
        let colNames = []

        keys.forEach(key => {
            colNames.push({
                "key" : key,
                "name" : this.state.columns[key]["name"]
            })
        })

        keys.forEach(key => {
            columnsToRender.push(
                <Col align="center" key={`${key}${this.state.columns[key]["name"]} `}>                    
                        <Column key={key}
                            id = {key}
                            name = {this.state.columns[key]["name"]}   
                            tasks = {this.state.columns[key]["tasks"]}     
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
                        onClick={e => this.addColumn()}
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