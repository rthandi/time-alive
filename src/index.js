import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function MonthsCalc(props) {
    const monthsAlive = ((props.date.getFullYear() - getYear(props.dateOfBirth)) * 12) + (props.date.getMonth() - getMonth(props.dateOfBirth));
    return (
        <h2>You have been alive for {monthsAlive} months</h2>
    )
}

function DaysCalc(props) {
    const date1 = props.date;
    const date2 = props.dateOfBirth;
    const daysAlive = calculateDays(date1.getDay(), date1.getMonth(), date1.getFullYear(), getDay(date2), getMonth(date2), getYear(date2));
    const hoursAlive = daysAlive * 24 + date1.getHours();
    const minsAlive = hoursAlive * 60 + date1.getMinutes();
    const secsAlive = minsAlive * 60 + date1.getSeconds();
    return (
        <div>
            <h2>Equivalent to: {daysAlive} days</h2>
            <h2>Equivalent to: {hoursAlive} hours</h2>
            <h2>Equivalent to: {minsAlive} minutes</h2>
            <h2>Equivalent to: {secsAlive} seconds</h2>
        </div>
    )
}

class DoBForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dateOfBirth: null,
            date: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({dateOfBirth: event.target.value})
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // TODO: update this so it doesn't reset the form
    tick() {
        this.setState({
            date: new Date()
        });
    }

    hideAlive() {
        if(this.state.date && this.state.dateOfBirth){
            return (
                <div>
                    <MonthsCalc
                        dateOfBirth = {this.state.dateOfBirth}
                        date = {this.state.date}
                    />
                    <DaysCalc
                        dateOfBirth = {this.state.dateOfBirth}
                        date = {this.state.date}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Date of birth:
                        <input
                            name="dob"
                            type="date"
                            value={this.state.dateOfBirth}
                            onChange={this.handleChange}
                        />
                    </label>
                </form>
                <div>
                    <h2>It is currently {this.state.date.toString()}</h2>
                </div>
                <div>
                    {this.hideAlive()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<DoBForm />,
    document.getElementById('root'));

function countLeapYearsBefore(year, month){
    let outputYear = year;
    if (month <= 2){
        outputYear--
    }
    return Math.floor((outputYear/4) - (outputYear/100) + (outputYear/400));
}

function calculateDays(day1, month1, year1, day2, month2, year2) {
    //TODO: this seems to be about a month out - fix
    const dayMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let total1 = year1 * 365 + day1;
    for (let i = 0; i < month1 - 1; i++) {
        total1 += dayMonths[i];
    }
    total1 += countLeapYearsBefore(year1, month1);

    let total2 = year2 * 365 + parseInt(day2);
    for (let i = 0; i < month2 - 1; i++) {
        total2 += dayMonths[i];
    }
    total2 += countLeapYearsBefore(year2, month2);

    return(total1 - total2)
}

function getYear(date) {
    return date.substring(0, 4);
}

function getMonth(date) {
    return date.substring(5, 7);
}

function getDay(date) {
    return date.substring(8);
}