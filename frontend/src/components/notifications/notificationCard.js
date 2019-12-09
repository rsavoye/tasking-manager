import React from 'react';
import {Link} from '@reach/router'
import DOMPurify from 'dompurify';

const rawHtmlNotification = notificationHtml => ({
  __html: DOMPurify.sanitize(notificationHtml),
});

export function NotificationCard({
  messageId,
  name,
  messageType,
 fromUsername,
  subject,
sentDate
}: Object) {
  return (
    <Link to={`/inbox/message/${messageId}`} className={`no-underline `}>
      <article className={`db bl br2 b2 b--blue base-font w-75-m w-100 mb3 mh2 blue-dark mw8`}>
      <div className="pv3 ph3 ba br1 b--grey-light shadow-hover">
      <strong>#{messageId}</strong> {fromUsername ? `from ${fromUsername} ` : ''}
      {messageType} <strong dangerouslySetInnerHTML={rawHtmlNotification(subject)}></strong>
        </div>
     </article>
    </Link>

  );
}
