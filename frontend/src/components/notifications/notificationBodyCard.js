import React from 'react';
import { Link } from '@reach/router';
import DOMPurify from 'dompurify';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

const rawHtmlNotification = notificationHtml => ({
  __html: DOMPurify.sanitize(notificationHtml),
});

export function NotificationBodyCard({
  loading,
  card: { messageId, name, messageType, fromUsername, subject, message, sentDate },
}: Object) {
  return (
    <ReactPlaceholder ready={!loading} type="media" rows={6}>
      <article className={`db  base-font mb3 mh2 blue-dark mw8`}>
        <div className={`dib`}>
            {fromUsername && <div className={`pl5 f6 `}>{fromUsername}</div>}
            <div className={`pl5 f6`}>Sent: {sentDate}</div>
        </div>
        <div className="pv3 pr3 pl5">
        <strong className={`pv1`} dangerouslySetInnerHTML={rawHtmlNotification(subject)}></strong>
        <div className={`pv1 f6`} dangerouslySetInnerHTML={rawHtmlNotification(message)}/>
        </div>
        <Link className={`link fr ba ma2 ph4 pv2 bg-red b--grey-light white`} to={`/inbox/delete/${messageId}`}>Delete</Link>
      </article>
    </ReactPlaceholder>
  );
}
