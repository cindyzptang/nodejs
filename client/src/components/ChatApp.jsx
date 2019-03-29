import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
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
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    messageContainer: {
        overflowY: 'scroll',
        height: 'calc(100vh - 64px - 64px)',
    },
    inputField: {
        height: 64,
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
                <Grid item xs={3}>
                    <div className={classes.toolbarIcon}>Rooms</div>
                    <Divider />
                    Render room
                </Grid>
                <Grid item xs={9}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography component="h1" variant="h6" color="inherit" noWrap>
                                Let's Talk
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.messageContainer}>
                        <MessageList messages={this.state.messages} />
                    </div>
                    <div className={classes.inputField}>
                        <Input className={classes.inputField} onSubmit={this.addMessage} />
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ChatApp);
