import React, { FC } from 'react';

import { Notification } from '@components/Notification';
import { Question } from '@types';

import './Questions.scss';

type QuestionsProps = {
  items: Question[];
};

export const Questions: FC<QuestionsProps> = ({ items }) => {
  if (!items.length) {
    return <Notification message="There is no questions." />;
  }
  return (
    <ul className="question__list">
      {items.map(({ question, answer }, index) => (
        <li key={index} className="question__item">
          <div className="question__part">
            <span className="question__part_bold question__part_question">
              Question:
            </span>
            <p>{question}</p>
          </div>
          <div className="question__part">
            <span className="question__part_bold">Answer:</span>
            <p>{answer}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
