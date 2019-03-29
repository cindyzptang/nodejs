import React, { Component } from 'react';
import { TextComposer, Row, TextInput, SendButton } from '@livechat/ui-kit';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleSubmit = value => {
        this.props.onSubmit(value);
    };

    render() {
        return (
            <TextComposer defaultValue="" onSend={this.handleSubmit}>
                <Row align="center">
                    <TextInput
                        minRows={2}
                        onKeyDown={this.onKeyDown}
                        placeholder="Cindy and Dandan await your reply..."
                    />
                    <SendButton fit onClick={this.handleSubmit} />
                </Row>

                <Row verticalAlign="center" justify="right" />
            </TextComposer>
        );
    }
}
export default Input;
