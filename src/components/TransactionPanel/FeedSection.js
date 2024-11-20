import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ActivityFeed } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build ActivityFeed section
const FeedSection = props => {
  const {
    className,
    rootClassName,
    currentTransaction,
    currentUser,
    fetchMessagesError,
    fetchMessagesInProgress,
    initialMessageFailed,
    messages,
    oldestMessagePageFetched,
    onShowMoreMessages,
    onOpenReviewModal,
    totalMessagePages,
  } = props;
  const txTransitions = currentTransaction.attributes.transitions
    ? currentTransaction.attributes.transitions
    : [];
  const hasOlderMessages = totalMessagePages > oldestMessagePageFetched;

  const showFeed =
    messages.length > 0 || txTransitions.length > 0 || initialMessageFailed || fetchMessagesError;

  const classes = classNames(rootClassName || css.feedContainer, className);

  return showFeed ? (
    <div className={classes}>
      <h3 className={css.feedHeading}>
        <FormattedMessage id="TransactionPanel.activityHeading" />
      </h3>
      <h2>Aviso Importante</h2>
      <p>Por favor, recuerden que en el chat de nuestro marketplace <strong>no está permitido compartir información personal</strong> como correos electrónicos, números de teléfono, direcciones, etc. 
      Esto es para proteger su privacidad y seguridad. Gracias por su comprensión y cooperación.</p>
      {initialMessageFailed ? (
        <p className={css.messageError}>
          <FormattedMessage id="TransactionPanel.initialMessageFailed" />
        </p>
      ) : null}
      {fetchMessagesError ? (
        <p className={css.messageError}>
          <FormattedMessage id="TransactionPanel.messageLoadingFailed" />
        </p>
      ) : null}
      <ActivityFeed
        className={css.feed}
        messages={messages}
        transaction={currentTransaction}
        currentUser={currentUser}
        hasOlderMessages={hasOlderMessages && !fetchMessagesInProgress}
        onOpenReviewModal={onOpenReviewModal}
        onShowOlderMessages={onShowMoreMessages}
        fetchMessagesInProgress={fetchMessagesInProgress}
      />
    </div>
  ) : null;
};

export default FeedSection;
