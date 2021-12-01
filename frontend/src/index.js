import React from 'react';
import ReactDOM from 'react-dom';
import Table from './table';
import * as api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
/>


function convertTimeFromDb(data){
  Object.keys(data).forEach(col => {
    Object.keys(data[col]["todoItems"]).forEach(todoItem => {      
      var date = data[col]["todoItems"][todoItem]["dueDate"].split((/[-T]/));
      data[col]["todoItems"][todoItem]["dueDate"] = `${date[0]}-${date[1]}-${date[2]}`
    })
  });
}

function countOffsets(data){
  var biggestColumnId = 0
  var biggestTodoItemId = 0
  Object.keys(data).forEach(col => {
    if (biggestColumnId < data[col]["id"]){
      biggestColumnId = data[col]["id"];
    }
    Object.keys(data[col]["todoItems"]).forEach(todoItem => {
      if (biggestTodoItemId < data[col]["todoItems"][todoItem]["id"]){
          biggestTodoItemId = data[col]["todoItems"][todoItem]["id"];
        }
    });  
  });
  return [biggestColumnId + 1, biggestTodoItemId + 1];
}

function orderTasks(data){
  Object.keys(data).forEach(col => {
    data[col]["todoItems"].sort((a, b) => (a["priority"] > b["priority"]) ? 1 : -1) 
  })
}

api.getColumns().then(data => {
  convertTimeFromDb(data);
  orderTasks(data);
  ReactDOM.render(
    <Table 
      columns = {data}
      colOffset = {countOffsets(data)[0]}
      taskOffset = {countOffsets(data)[1]}
    />,    
    document.getElementById('root')
);
});


