import React, { FC } from 'react';

import { Container } from '@components/Container';
import error from '@assets/error.png';

import './Error.scss';

type ErrorProps = {
  message: string;
};

export const Error: FC<ErrorProps> = ({ message }) => {
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
          <p className="error__sorry">We are sorry,</p>
          <p className="error__reason">{message}</p>
        </div>
      </Container>
    </section>
  );
};
