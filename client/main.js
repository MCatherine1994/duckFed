import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Website from '../imports/ui/pages/websitePage';
 
Meteor.startup(() => {
  render(<Website />, document.getElementById('render-target'));
});
