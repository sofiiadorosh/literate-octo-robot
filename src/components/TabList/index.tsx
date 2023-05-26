import React, { FC } from 'react';

import { TabItem } from '@components/TabItem';
import { Tabs, Review, Question } from '@types';

import './TabList.scss';

type TabListProps = {
  activeTab: Tabs;
  reviews: Review[];
  questions: Question[];
  onSetTab: (tab: Tabs) => void;
};

export const TabsList: FC<TabListProps> = ({
  activeTab,
  reviews,
  questions,
  onSetTab,
}) => {
  const tabs = Object.values(Tabs);
  return (
    <ul className="tab__list">
      {tabs.map(tab => (
        <TabItem
          key={tab}
          selected={activeTab === tab}
          onClick={() => onSetTab(tab)}
        >
          <span>{tab}</span>
          {tab === Tabs.QUESTIONS && Boolean(questions.length) && (
            <span className="tab__tag">{questions.length}</span>
          )}
          {tab === Tabs.REVIEWS && Boolean(reviews.length) && (
            <span className="tab__tag">{reviews.length}</span>
          )}
        </TabItem>
      ))}
    </ul>
  );
};
