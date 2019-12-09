import React from 'react';
import ApiCaller from '../../API/ApiCaller.js';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeTaskComplete = this.handleChangeTaskComplete.bind(this);
    }

    handleChangeTaskComplete(event, task) {
        let caller = new ApiCaller();

        task.complete = event.target.checked;

        caller.completeTask(task.id, task.complete, this.props.handleChangeTaskComplete);
    }

    render() {

        let tasksRender;

        if (this.props.tasks !== undefined && this.props.tasks.length > 0 && this.props.tasks.map) {
            tasksRender = (
                <ul className="list-group">
                    {this.props.tasks.map((item, index) =>
                        <li className="list-group-item" key={item.id}>
                            <input type="checkbox" 
                                checked={item.complete} 
                                onChange={(event) => this.handleChangeTaskComplete(event, item)} />
                            <span className='task-name'>{item.task}</span>
                        </li>
                    )}
                </ul>
            );
        }

        return (
            <React.Fragment>
                {tasksRender}
            </React.Fragment>
        );
    }
}

export default TaskList;