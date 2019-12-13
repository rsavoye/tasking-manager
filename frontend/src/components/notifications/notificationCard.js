import React from 'react';
import { Link } from '@reach/router';
import DOMPurify from 'dompurify';
import { EyeIcon, WasteIcon, ListIcon } from '../svgIcons';

const rawHtmlNotification = notificationHtml => ({
  __html: DOMPurify.sanitize(notificationHtml),
});

const ReadLink = props => (
  <Link to={`/inbox/message/${props.messageId}/read`} className={`hover-red`}>
    <EyeIcon className={`fr h1 w1 pr3 mv1 pv1`} />
  </Link>
);

const ListLink = props => (
  <Link to={`/inbox/message/${props.projectId}/list`} className={`hover-red`}>
    <ListIcon className={`fr h1 w1 pr3 mv1 pv1`} />
  </Link>
)

export function NotificationCard({
  messageId,
  name,
  messageType,
  fromUsername,
  subject,
  read,
  sentDate,
}: Object) {

  const typesThatAreMessages = ['SYSTEM', 'REQUEST_TEAM_NOTIFICATION', 'INVITATION_NOTIFICATION'];
 
  const readOrListLink = messageType && typesThatAreMessages.indexOf(messageType) === -1 ? <ListLink messageId={messageId} /> : <ReadLink messageId={messageId} />;
  const readStyle = read ? '' : 'bl bw2 br2 b2 b--red ';

  return (
    <Link to={`/inbox/message/${messageId}`} className={`no-underline `}>
      <article className={`db base-font w-75-m w-100 mb3 mh2 blue-dark mw8 ${readStyle}`}>
        <div className="h3-ns h4 pv3 pl5 pr3 ba br1 b--grey-light">

          {fromUsername ? `from ${fromUsername} ` : ''}
          <strong dangerouslySetInnerHTML={rawHtmlNotification(subject)}></strong>

          <Link to={`/inbox/message/${messageId}/delete`} className={`hover-red`}>
            <WasteIcon className={`fr h1 w1 mv1 pv1 pr3`} />
          </Link>
          <div className={`fr dib f7 truncate w4 pa1 ma1`} title={messageType}>
            {messageType}
          </div>
          {readOrListLink}
          {messageType === 'MENTION_NOTIFICATION' && (
            <div className="dib fr ma1 ttu b--red ba red f7 pa1">1 mention</div>
          )}



        </div>
      </article>
    </Link>
  );
}
