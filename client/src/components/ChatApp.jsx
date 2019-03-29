import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { instanceLocator, tokenProviderUrl, generalRoomId } from '../ChatKitUtil';
import Input from './Input';
import MessageList from './MessageList';
import { Grid } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    messageContainer: {
        overflowY: 'scroll',
        height: 'calc(100vh - 64px - 64px)',
    },
    inputField: {
        height: 64,
    },
    messageApp: {
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    },
});

class ChatApp extends Component {
    state = {
        currentUser: null,
        currentRoom: { users: [] },
        messages: [],
        users: [],
    };
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
                this.setState({
                    currentRoom,
                    users: currentRoom.userIds,
                });
            })
            .catch(error => console.log(error));
    }

    addMessage = text => {
        this.state.currentUser
            .sendMessage({
                text,
                roomId: this.state.currentRoom.id,
            })
            .catch(error => console.error('error', error));
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={0}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" noWrap>
                            Let's Talk
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid item xs={3}>
                    <div className={classes.toolbarIcon}>Rooms</div>
                    <Divider />
                    Render room
                </Grid>
                <Grid item xs={9} className={classes.messageApp}>
                    <div className={classes.messageContainer}>
                        <MessageList messages={this.state.messages} />
                    </div>
                    <div className={classes.inputField}>
                        <Input onSubmit={this.addMessage} />
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ChatApp);
