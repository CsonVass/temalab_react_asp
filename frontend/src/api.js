const axios = require('axios');

//-----------GET----------------
export function getColumns(){   
    try{
        const promise = axios.get('https://localhost:44370/api/columns')
        const dataPromise = promise.then((response) => response.data)
        return dataPromise
    }catch (err) {
        console.log(err);
    }
}

export function getColumnById(id){      
    try{
        const promise = axios.get(`https://localhost:44370/api/columns/${id}`)
        const dataPromise = promise.then((response) => response.data)
        return dataPromise
    }catch (err) {
        console.log(err);
    }
}

export function getTodoItems(colId){      
    try{
        const promise = axios.get(`https://localhost:44370/api/columns/${colId}/todoItems`)
        const dataPromise = promise.then((response) => response.data)
        return dataPromise
    }catch (err) {
        console.log(err);
    }
}

export function getTodoItemById(colId, id){      
    try{
        const promise = axios.get(`https://localhost:44370/api/columns/${colId}/todoItems/${id}`)
        const dataPromise = promise.then((response) => response.data)
        return dataPromise
    }catch (err) {
        console.log(err);
    }
}

//-----------DELETE----------------
export function deleteColumn(colId){
    try{
        axios.delete(`https://localhost:44370/api/columns/${colId}`)
    }catch (err) {
        console.log(err);
    }
}

export function deleteTodoItem(colId, id){
    try{
        axios.delete(`https://localhost:44370/api/columns/${colId}/todoItems/${id}`)
    }catch (err) {
        console.log(err);
    }
}

//-----------POST------------------------
export function postColumn(column){
    axios.post('https://localhost:44370/api/columns', {
        name: column["name"],
        todoItems: column["todoItems"]
      })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
}

export function postTodoItem(todoItem, priority, colId){
    axios.post(`https://localhost:44370/api/columns/${colId}/todoItems`, {
        name: todoItem["name"],
        dueDate:todoItem["dueDate"],
        description: todoItem["description"],
        columnId: colId,
        priority: priority
      })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
}

//-----------PUT------------------------
export function putColumn(column){    
    console.log(column)
    axios.put(`https://localhost:44370/api/columns/${column["id"]}`, {
        id: column["id"],
        name: column["name"],
        todoItems: column["todoItems"]
      })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
}

export function putTodoItem(todoItem, priority, colId, newColId){
    axios.put(`https://localhost:44370/api/columns/${colId}/todoItems/${todoItem["id"]}?newColumnId=${newColId}`, {
        id: todoItem["id"],
        name: todoItem["name"],
        dueDate:todoItem["dueDate"],
        description: todoItem["description"],
        columnId: colId,
        priority: priority
      })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
}

