

class ApiCaller {

    getServerUrl(){
        return 'http://localhost:5000/api/';
    }
     

    getTasks(date, callback) {
        fetch(this.getServerUrl() + 'list-tasks?date=' + date)
            .then(res => { return res.json(); })
            .then(res => { callback(res); })
            .catch(err => err);
    }

    addTask(task, callback) {
        fetch(this.getServerUrl() + 'add-task', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(task)
        })
        //.then(res => { return res.json(); })
        .then(res => { callback(res); })
        .catch(err => err);
    }

    updateTask(task, callback) {

        fetch(this.getServerUrl() + 'update-task', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(task)
        })
        .then(res => { return res.json(); })
        .then(res => { callback(res); })
        .catch(err => err);
    }

    completeTask(id, complete, callback) {

        fetch(this.getServerUrl() + 'complete-task', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({id: id, complete: complete})
        })
        //.then(res => { return res.json(); })
        .then(res => { callback(res); })
        .catch(err => err);
    }

}

export default ApiCaller;