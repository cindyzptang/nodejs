import React, { Component } from 'react';
import { MessageList, Message, MessageText, MessageGroup, Row, Avatar } from '@livechat/ui-kit';
import { withStyles } from '@material-ui/core';

class ChatMessageList extends Component {
    getMessageGroups(messageList) {
        let grandList = [];
        let tempArray = [];
        let tempAuthor = '';
        messageList.forEach(message => {
            if (tempArray.length === 0) {
                tempArray.push(message);
                tempAuthor = message.senderId;
            } else if (tempAuthor === message.senderId) {
                tempArray.push(message);
            } else {
                grandList.push(tempArray);
                tempArray = [message];
                tempAuthor = message.senderId;
            }
        });
        grandList.push(tempArray);
        return grandList;
    }
    render() {
        const { messages, currentUser, classes } = this.props;

        if (!messages) {
            return null;
        }
        const messageGroups = this.getMessageGroups(messages);

        return (
            <MessageList className={classes.messageList} active>
                {messageGroups.map((group, index) => (
                    <MessageGroup onlyFirstWithMeta key={`message-group-${index}`}>
                        {group.map((message, index) => (
                            <Row reverse={message.senderId === currentUser.id}>
                                <Message
                                    authorName={message.senderId}
                                    date={message.createdAt}
                                    isOwn={message.senderId === currentUser.id}
                                    key={`message-${index}`}
                                >
                                    <div className={classes.textBubble}>
                                        <MessageText>{message.text}</MessageText>
                                    </div>
                                </Message>
                            </Row>
                        ))}
                    </MessageGroup>
                ))}
            </MessageList>
        );
    }
}

const styles = {
    messageList: {
        height: 'unset !important',
    },
    textBubble: {
        display: 'inline-block',
        maxWidth: '100%',
        marginBottom: '0.1em',
        color: 'rgb(255, 255, 255)',
        fontSize: 14,
        borderRadius: '0.4em',
        border: '1px solid #f06292',
        background: '#f48fb1',
    },
};
export default withStyles(styles)(ChatMessageList);
