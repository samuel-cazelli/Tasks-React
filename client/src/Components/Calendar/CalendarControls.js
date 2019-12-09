import React from 'react';

class CalendarControls extends React.Component {
    constructor(props) {
        super(props);

        this.onMoveCalendarBack = this.onMoveCalendarBack.bind(this);
        this.onMoveCalendarForward = this.onMoveCalendarForward.bind(this);
    }

    onMoveCalendarBack() {
        this.props.handleMoveCalendarBack();
    }

    onMoveCalendarForward() {
        this.props.handleMoveCalendarForward();
    }

    render() {
        return (
            <React.Fragment>
                <div className="input-group mb-3">
                    <div className="input-group-prepend" onClick={() => this.onMoveCalendarBack()}>
                        <span className="input-group-text">&#60;</span>
                    </div>
                    <input type="text" className="form-control month-year-input" disabled value={this.props.month + '/' + this.props.year}></input>
                    <div className="input-group-append">  
                        <span className="input-group-text" onClick={() => this.onMoveCalendarForward()}>></span>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default CalendarControls;