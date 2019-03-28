import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { instanceLocator, tokenProviderUrl, generalRoomId } from '../ChatKitUtil';
import Input from './Input';
import MessageList from './MessageList';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: { users: [] },
            messages: [],
            users: [],
        };
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: tokenProviderUrl,
            }),
        });
        chatManager
            .connect()
            .then(currentUser => {
                debugger;
                this.setState({ currentUser: currentUser });
                return currentUser.subscribeToRoom({
                    roomId: generalRoomId,
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            });
                        },
                    },
                });
            })
            .then(currentRoom => {
                debugger;
                this.setState({
                    currentRoom,
                    users: currentRoom.userIds,
                });
            })
            .catch(error => console.log(error));
    }

    addMessage(text) {
        this.state.currentUser
            .sendMessage({
                text,
                roomId: this.state.currentRoom.id,
            })
            .catch(error => console.error('error', error));
    }
    render() {
        return (
            <div>
                <h2 className="header">Let's talk</h2>
                <MessageList messages={this.state.messages} />
                <Input className="input-field" onSubmit={this.addMessage} />
            </div>
        );
    }
}

export default ChatApp;
