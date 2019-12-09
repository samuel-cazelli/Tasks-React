import React from 'react';

class Day extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectDate = this.onSelectDate.bind(this);
    }
    onSelectDate(date) {
        this.props.handleSelectDate(date);
    }
    render() {
        return <td
            onClick={() => this.onSelectDate(this.props.date)}
            className={this.props.selected ? 'calendar-date calendar-selected-date' : 'calendar-date'}>
            {new Date(this.props.date).getUTCDate()}
        </td>;
    }
}

export default Day;