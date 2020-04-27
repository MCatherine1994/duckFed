import PropTypes from 'prop-types';
import React, { Component, useCallback } from 'react';
import ReactDOM from 'react-dom';

import '../../../node_modules/uikit/dist/css/uikit.min.css';

export const getDate = (date) => {
  let month = date.getMonth() + 1;
  month = month >= 10 ? month.toString() : '0' + month.toString();
  let day = date.getDate();
  day = day >= 10 ? day.toString() : '0' + day.toString()
  return date.getFullYear().toString() + month + day.toString();
};

const getDaysInMonth = (month,year) => {
 return new Date(year, month, 0).getDate();
};

/**
* A InputForm component
*/
class InputForm extends Component {
  /**
  * Initialize the React element
  * @param {props} props React element properties
  */
  constructor(props) {
    super(props);
    this.state = { location: '', duckNum: '', time: '', food: '', foodType: '', foodAmount: '', monthData: false, };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFormField = this.getFormField.bind(this);
    this.handleMonthData = this.handleMonthData.bind(this);
  }

  /**
  * @summary Update the state value
  * @param {object} event form input value change event
  * @returns {none} null
  */
  handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }

  /**
  * @summary Set to submit data for month
  * @returns {none} null
  */
  handleMonthData = () => {
    const { monthData } = this.state;
    this.setState({monthData: !monthData});
  }

  /**
  * @summary Update the state value
  * @param {object} event form input value change event
  * @returns {none} null
  */
  handleSubmit(event) {
    event.preventDefault();
    const { callback, date } = this.props;
    const { location, duckNum, time, food, foodType, foodAmount, monthData } = this.state;
    const formateDate = getDate(date);
    const hasData = (location !== '') || (duckNum !== '') || (time !== '') || (food !== '') ||
    (foodType !== '') || (foodAmount !== '');
    if (hasData) {
      const newData = [];
      if (monthData) {
        const year = Number(formateDate.substring(0, 4));
        const month = Number(formateDate.substring(4, 6));
        const days = getDaysInMonth(month, year);
        for (let i = 1; i <= days; i += 1) {
          let newDate;
          if (i < 10) {
            newDate = formateDate.substring(0, 6) + '0' + i.toString();
          } else {
            newDate = formateDate.substring(0, 6) + i.toString();
          }
          newData.push({ date: newDate, location, duckNum, time, food, foodType, foodAmount });
        };
      } else {
        newData.push({ date: formateDate, location, duckNum, time, food, foodType, foodAmount });
      }
      callback(newData);
    }
    document.getElementById("in-form").reset();
    this.setState({ location: '', duckNum: '', time: '', food: '', foodType: '', foodAmount: '' })
  }

  /**
  * @summary Reusable function to get form question and field
  * @param {string} label question label
  * @param {string} name identity of the question
  * @returns {JSX} returns React element
  */
  getFormField(label, name) {
    return (
      <div className="uk-margin">
        <label className="uk-form-label">{label}</label>
        <div className="uk-form-controls">
          <input className="uk-input" id={`form-${name}-text`} ref="textInput" name={name} type="text" onChange={this.handleChange}/>
        </div>
      </div>
    );
  }

  /**
  * Renders a input form component
  * @returns {JSX} returns React element
  */
  render() {
    const { monthData } = this.state;

    return (
      <form className="new-task" id="in-form" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Upload New Record</legend>

          {this.getFormField('Where the ducks are fed?', 'location')}
          {this.getFormField('How many ducks are fed?', 'duckNum')}
          {this.getFormField('What time the ducks are fed?', 'time')}
          {this.getFormField('What food the ducks are fed?', 'food')}
          {this.getFormField('What kind of food the ducks are fed?', 'foodType')}
          {this.getFormField('How much food the ducks are fed?', 'foodAmount')}

          <div className="uk-margin">
            <label className="uk-form-label">Do you want to submit the same data for the entire month?</label>
            <div className="uk-form-controls" style={{ paddingTop: '10px' }}>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label><input className="uk-radio" type="radio" name="radio1" onChange={this.handleMonthData} /> Yes </label>
              <label><input className="uk-radio" type="radio" name="radio1" checked={!monthData} onChange={this.handleMonthData} /> No </label>
              </div>
            </div>
          </div>

          <button className="uk-button uk-button-default">Submit</button>
        </fieldset>
      </form>
    );
  }
}

InputForm.defaultProps = {
  callback: null,
  date: new Date(),
};

InputForm.propTypes = {
  callback: PropTypes.func,
  date: PropTypes.shape(),
};

export default InputForm;