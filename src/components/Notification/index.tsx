import React, { FC } from 'react';

import './Notification.scss';

type NorificationProps = {
  message: string;
};

export const Notification: FC<NorificationProps> = ({ message }) => {
  return <p className="notification">{message}</p>;
};
