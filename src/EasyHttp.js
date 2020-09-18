class Http {
    async get(id = null) {
        const res = await fetch('http://localhost:3000/Posts');
        const resJson = await res.json();

        return resJson;
    }

    async post(data) {
        const res = await fetch(`http://localhost:3000/Posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    async update(data, id) {
        const res = await fetch(`http://localhost:3000/Posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async delete(id) {
        const res = await fetch(`http://localhost:3000/Posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }
}

const http = new Http();

export default http;