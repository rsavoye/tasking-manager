import React from 'react';

export function NotificationCard({
    messageId,
    name,
    messageType,
    subject,
  }: Object) {
    return (
    <article className={`db base-font w-75-m w-100 mb3 ph2 blue-dark mw5`}>
  <div className="f5 blue-grey ">#{messageId} {messageType} {subject}</div>
    </article>
    );
  }