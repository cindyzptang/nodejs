import React, { Component } from 'react';
import { MessageList, Message, MessageText, MessageGroup } from '@livechat/ui-kit';

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
        const { messages, currentUser } = this.props;

        if (!messages) {
            return null;
        }
        const messageGroups = this.getMessageGroups(messages);

        return (
            <MessageList>
                {messageGroups.map((group, index) => (
                    <MessageGroup onlyFirstWithMeta key={index}>
                        {group.map((message, index) => (
                            <Message
                                authorName={message.senderId}
                                date={message.createdAt}
                                isOwn={message.senderId === currentUser.id}
                                key={index}
                            >
                                <MessageText>{message.text}</MessageText>
                            </Message>
                        ))}
                    </MessageGroup>
                ))}
            </MessageList>
        );
    }
}
export default ChatMessageList;
