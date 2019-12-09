import React from 'react';

import './App.css';

import { createHashHistory } from 'history';
import { Helmet } from 'react-helmet'

import CalendarWrapper from './Components/Calendar/CalendarWrapper.js';
import TaskWrapper from './Components/Task/TaskWrapper.js';


class Main extends React.Component {

  constructor(props) {
    super(props);

    let defaultDate =  this.getDefaultDate();

    this.state = {
      year: parseInt(defaultDate.getFullYear()),
      month: parseInt(defaultDate.getMonth() + 1),
      selectedDate: defaultDate.toString()
    };

    this.handleSelectDate = this.handleSelectDate.bind(this);

  }

  getDefaultDate(){

    let defaultDate;

    let history = (new createHashHistory());

    if (history.location.pathname !== '/') {
      defaultDate = new Date(history.location.pathname.substring(1))
    } else {
      defaultDate = new Date();
      defaultDate.setHours(0, 0, 0, 0);
    }

    return defaultDate;

  }

  selectDate(date) {
    date = new Date(date);

    this.setState({ selectedDate: date });

    createHashHistory().push('/' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate());
  }

  handleSelectDate(date) {
    this.selectDate(date);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <Helmet>
          <title>Tasks - {this.state.selectedDate ? new Date(this.state.selectedDate).toLocaleDateString() : ''}</title>
        </Helmet>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <CalendarWrapper
            year={this.state.year}
            month={this.state.month}
            handleSelectDate={this.handleSelectDate}
            selectedDate={this.state.selectedDate} />
          <TaskWrapper
            date={this.state.selectedDate} />
        </div>
      </div>
    )
  }
}

function App() {

  return (
    <div className="App">
      <Main />
    </div>
  );
}



export default App;
