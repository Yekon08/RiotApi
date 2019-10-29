/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Button from '@material-ui/core/Button';

export default function HomePage() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <p><FormattedMessage {...messages.test} /></p>

      {/* Test MaterialUI */}
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </h1>
  );
}
