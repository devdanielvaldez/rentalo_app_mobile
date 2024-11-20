import React from 'react'
import {  Avatar } from '../../../components';
import { getAuthorName, getMessageBody } from '../../../util/dataExtractors';
import { formatDate } from '../../../util/dates';
import css from '../PanelPage.module.css';

function SectionNotification(props) {
    const { notification, isMessage, toTxItem, currentTransaction, intl } = props;
    const todayString = intl.formatMessage({ id: 'ActivityFeed.today' });
    if (isMessage) {
        return (
            <div>
                <span>
                    <div className={css.messageContainer}>
                        <div className={css.author}> 
                            {notification && notification.sender && notification.sender.id &&
                                <Avatar className={css.avatar} user={notification.sender} />}
                            {getAuthorName(notification)}
                        </div>

                        <div>
                            <p className={css.messageContent}>{getMessageBody(notification)}</p>
                            <p className={css.messageDate}>
                                {formatDate(intl, todayString, notification?.attributes?.createdAt)}
                            </p>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
    return (
        <div>{toTxItem(currentTransaction)}</div>
    )
}

export default SectionNotification