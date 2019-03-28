import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class  ChatMessage extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }
    changeView() {
        this.props.changeView('signup')
    }
    render() {
        return (
            <div>
                <Button className="chat-button" onClick={this.changeView} variant="contained" color="primary">
                    Send a message
                </Button>
            </div>
        )
    }
}
export default ChatMessage;