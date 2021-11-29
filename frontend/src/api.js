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