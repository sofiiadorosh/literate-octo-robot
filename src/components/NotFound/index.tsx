import React from 'react';

import { Container } from 'components/Container';

import error from 'assets/error.png';

import './NotFound.scss';

export const NotFound = () => {
  return (
    <section className="error">
      <Container>
        <div className="error__picture">
          <img
            src={error}
            alt="404 error page not found with people connecting a plug"
          />
        </div>
        <div className="error__message">
          <p className="error__message--sorry">We are sorry,</p>
          <p className="error__message--not-found">
            but the page you were looking for can’t be found...
          </p>
        </div>
      </Container>
    </section>
  );
};
