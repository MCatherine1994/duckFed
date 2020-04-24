import React, { Component } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import '../../../node_modules/uikit/dist/css/uikit.min.css';

/*
* A Website component
*/
class Website extends Component {
  /**
  * @summary Initialize the React element
  * @param {props} props React element properties
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
  * @summary Handle the date change of the date picker
  * @param {date} date a selected date
  * @returns {undefined} Nothing
  */
  onChange(date) {
    this.setState({ selectedDate: date });
  }

  /**
  * Renders a website component
  * @returns {JSX} returns React element
  */
  render() {
    const { selectedDate } = this.state;
    return (
      <div className="website-page uk-container">
        <div className="uk-container website-title uk-flex" uk-grid="">
          <h2 className="uk-width-expand">Ducks Fed Statistics</h2>
        </div>

        <div className="uk-container website-date uk-flex">
          <h3>Please select a date to view or add the data for:</h3>
          <div className="date-picker">
            <DatePicker
              onChange={this.onChange}
              selected={selectedDate}
            />
          </div>
        </div>
  
        <div className="website-content uk-grid-medium uk-flex" uk-grid="">
          <div className="data-table uk-width-2-3">
            <div className="uk-card uk-card-default uk-card-body">
              Table Container
            </div>
          </div>
          <div className="data-input uk-width-1-3">
            <div className="uk-section uk-section-muted">
              Input Form Container
            </div>
          </div>
        </div>
      </div> 
    );
  }
}
export default Website;