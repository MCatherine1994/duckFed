import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { withTracker } from 'meteor/react-meteor-data';
 
import { fedData } from '../../api/fedData';
import InputForm, { getDate } from '../components/InputForm';

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
      selectedDate: new Date(),
      formatedData: {}
    };
    this.onChange = this.onChange.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.getTableContent = this.getTableContent.bind(this);
    this.insertData = this.insertData.bind(this);
  }

  /**
   * @summary runs after the element is inserted into the tree
   * @param {state} prevProps previous props
   * @returns {null} nothing
   */
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const transform = {};
    
    if (data && (prevProps.data.length === 0 || prevProps.data !== data)&& data.length > 0 ) {
      data.forEach((record) => {
        // i.e. record = {date: "20200424", time: "", location: "", duckNum: 30, food: "", foodType: "", foodAmount:""}
        if (!transform[record.date]) {
          transform[record.date] = [];
        }
        transform[record.date].push(record);
      });
      
      this.setState({ formatedData: transform });
    }
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
  * @summary Insert new data record to the mongo db
  * @param {list} record the new record array
  * @returns {undefined} Nothing
  */
  insertData(record) {
    record.forEach((data)=> {
      fedData.insert(data);
    })
  }

  /**
  * @summary get table content
  * @returns {JSX} The markup for the tabel content
  */
  getTableContent() {
    const { selectedDate, formatedData } = this.state;
    if (selectedDate && Object.keys(formatedData).length > 0) {
      const date = getDate(selectedDate);
      if (formatedData[date] && formatedData[date].length > 0) {
        return (
          <tbody>
            {formatedData[date].map((record) => {
              return (
                <tr key={Math.random()}>
                  <td>{record.location}</td>
                  <td>{record.duckNum}</td>
                  <td>{record.time}</td>
                  <td>{record.food}</td>
                  <td>{record.foodType}</td>
                  <td>{record.foodAmount}</td>
                </tr>
              );
            })}
          </tbody>
        );
      }
    }
    return (
      <tbody />
    );
  }

  /**
  * @summary render table
  * @returns {JSX} The markup for the table
  */
  renderTable() {
    const { selectedDate, formatedData } = this.state;
    let footnote = 'No record for the selected date. Please submit one or switch to another date.';
    if (selectedDate && Object.keys(formatedData).length > 0) {
      const date = getDate(selectedDate);
      if (formatedData[date] && formatedData[date].length > 0) {
        footnote = '';
      }
    }

    return (
      <React.Fragment>
        <div className="uk-overflow-auto">
          <table className="uk-table uk-table-justify uk-table-middle uk-table-divider uk-table-hover">
            <thead>
              <tr>
                <th className="uk-width-1-6">Location</th>
                <th className="uk-width-1-6">Duck Amount</th>
                <th className="uk-width-1-6">Time</th>
                <th className="uk-width-1-6">Food</th>
                <th className="uk-width-1-6">Food Type</th>
                <th className="uk-width-1-6">Food Amount</th>
              </tr>
            </thead>
            {this.getTableContent()}
          </table>
        </div>
        <p style={{ padding: '10px' }}>{footnote}</p>
      </React.Fragment>
    );
  }

  /**
  * Renders a website component
  * @returns {JSX} returns React element
  */
  render() {
    const { selectedDate } = this.state;
    const { data } = this.props;

    return (
      <div className="website-page uk-container">
        <div className="uk-container website-title uk-flex" uk-grid="">
          <h2 className="uk-width-expand">Ducks Fed Statistics</h2>
        </div>

        <div className="uk-container website-date uk-flex">
          <h3>Please select a date to view or add the record for:</h3>
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
              {this.renderTable()}
            </div>
          </div>
          <div className="data-input uk-width-1-3">
            <div className="uk-section uk-section-muted">
              <InputForm callback={this.insertData} date={selectedDate} />
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default withTracker(() => {
  return {
    data: fedData.find({}).fetch(),
  };
})(Website);
