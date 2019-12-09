import React from 'react';
import './Calendar.css';

import Calendar from './Calendar.js';
import CalendarControls from './CalendarControls.js';

class CalendarWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            year: parseInt(props.year), 
            month: parseInt(props.month),
            selectedDate: this.props.selectedDate
        };

        this.handleSelectDate = this.handleSelectDate.bind(this);
        this.handleMoveCalendarBack = this.handleMoveCalendarBack.bind(this);
        this.handleMoveCalendarForward = this.handleMoveCalendarForward.bind(this);
    }

    handleMoveCalendarBack() {
        this.setState(state => ({
            year: (state.month === 1) ? state.year - 1 : state.year,
            month: (state.month === 1) ? 12 : state.month - 1
        }));
    }

    handleMoveCalendarForward() {
        this.setState(state => ({
            year: (state.month === 12) ? state.year + 1 : state.year,
            month: (state.month === 12) ? 1 : state.month + 1
        }));
    }

    handleSelectDate(date) {
        this.props.handleSelectDate(date);
        this.setState({ selectedDate: date });
    }

    render() {
        return (
            <div className="wrapper rounded shadow bg-white">
                <CalendarControls
                    year={this.state.year}
                    month={this.state.month}
                    handleMoveCalendarBack={this.handleMoveCalendarBack}
                    handleMoveCalendarForward={this.handleMoveCalendarForward} />
                <Calendar
                    year={this.state.year}
                    month={this.state.month}
                    selectedDate={this.state.selectedDate}
                    handleSelectDate={this.handleSelectDate} />
            </div>
        )
    }
}

export default CalendarWrapper;