import PropTypes from 'prop-types';
import React, { Component, useCallback } from 'react';
import ReactDOM from 'react-dom';

import '../../../node_modules/uikit/dist/css/uikit.min.css';

export const getDate = (date) => {
  let month = date.getMonth() + 1;
  month = month >= 10 ? month.toString() : '0' + month.toString();
  return date.getFullYear().toString() + month + date.getDate().toString();
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
    this.state = { location: '', duckNum: '', time: '', food: '', foodType: '', foodAmount: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFormField = this.getFormField.bind(this);
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
  * @summary Update the state value
  * @param {object} event form input value change event
  * @returns {none} null
  */
  handleSubmit(event) {
    event.preventDefault();
    const date = getDate(new Date());
    const { location, duckNum, time, food, foodType, foodAmount } = this.state;
    const newData = { date, location, duckNum, time, food, foodType, foodAmount };
    const { callback } = this.props;
    callback(newData);
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

          <button className="uk-button uk-button-default">Submit</button>
        </fieldset>
      </form>
    );
  }
}

InputForm.defaultProps = {
  callback: null,
};

InputForm.propTypes = {
  callback: PropTypes.func,
};

export default InputForm;