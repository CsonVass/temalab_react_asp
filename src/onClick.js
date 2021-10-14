export function addTask() {
    fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        body: JSON.stringify({
            title: 'task1',
            body: 'do this and that',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

export function showTask() {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => response.json())
        .then((json) => console.log(json));

}

export function handleClick() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'GET',
        
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

export function editTask() {
   
}

export function deleteTask() {
   
}
