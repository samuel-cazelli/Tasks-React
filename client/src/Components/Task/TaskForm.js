import React from 'react';

import ApiCaller from '../../API/ApiCaller';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let caller = new ApiCaller();

        caller.addTask({
            date: this.props.date,
            task: this.refs.taskName.value,
            complete: false
        },
            this.props.handleSubmit
        );

        this.refs.taskName.value = '';

        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Task" name="task-name" ref="taskName" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Add</button>
                    </div>
                </div>
            </form>
        );
    }

}

export default TaskForm;