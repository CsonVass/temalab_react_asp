 export function  getResources() {
        let a = fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json());
        return a;
    }


