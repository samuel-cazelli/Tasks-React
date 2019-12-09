import React from 'react';

import './TaskList.css';

import TaksList from './TaskList';
import TaksForm from './TaskForm';

import ApiCaller from '../../API/ApiCaller.js';

class TaskWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = { tasks: [], date: this.props.date };

        //this.fillTasks = this.fillTasks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTaskComplete = this.handleChangeTaskComplete.bind(this);
    }

    fillTasks(date) {
        (new ApiCaller()).getTasks(date, (data) => {
            this.setState({ tasks: data });
        });
    }

    componentDidMount() {
        this.fillTasks(this.state.date);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({ date: this.props.date });
            this.fillTasks(this.props.date);
        }
    }

    handleSubmit() {
        this.fillTasks(this.state.date);
    }

    handleChangeTaskComplete() {
        this.setState({ tasks: this.state.tasks });
    }

    render() {
        return (
            <div className="wrapper rounded shadow bg-white">
                <h1 className='title-tasks'>{new Date(this.props.date).toLocaleDateString()}</h1>
                <TaksList tasks={this.state.tasks} handleChangeTaskComplete={this.handleChangeTaskComplete} />
                <br />
                <TaksForm date={this.state.date} handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default TaskWrapper;