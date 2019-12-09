import React from 'react';


import Day from './Day.js';
import CalendarDataStructure from '../../Utils/CalendarDataStructure.js';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelectDate = this.handleSelectDate.bind(this);

        this.state = { selectedDate: this.props.selectedDate };

    }

    handleSelectDate(date) {
        this.props.handleSelectDate(date);
        this.setState({ selectedDate: date });

    }
    
    render() {
        let calendarData = (new CalendarDataStructure()).getCalendar(this.props.year, this.props.month);
        return (
                <table className="calendar">
                    <tbody>
                        <tr key='100'>{calendarData.header.map((headerDay, index) => <td key={index} className="calendar-day-name">{headerDay}</td>)}</tr>
                        {calendarData.weeks.map((week, indexWeek) =>
                            <tr key={indexWeek}>
                                {week.map((date, indexDay) => {
                                    if (date === undefined) {
                                        return <td key={indexDay - 99}></td>
                                    } else {
                                        return <Day
                                            key={date.getUTCDate()}
                                            date={date.toString()}
                                            handleSelectDate={this.handleSelectDate}
                                            selected={date.toString() === this.state.selectedDate.toString()}
                                        />
                                    }
                                })}
                            </tr>
                        )}
                    </tbody>
                </table>
        );

    }
}

export default Calendar;