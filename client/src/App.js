import React, { Component } from 'react';
import ChatMessage from './components/ChatMessage';
import Signup from './components/Signup';
import ChatApp from './components/ChatApp'; 

import Chatkit from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:39023abe-c71c-4dfc-9f94-74a3798d5fc3",
  key: "74a7aff1-838f-4705-abd5-291d7d36470e:SLmVnw3HotDVpl0hsN8UqhiCmx8p0tHz4OjkTYisS2Y="
})


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentUsername: '',
          currentId: '',
          currentView: 'signup'
      }
      this.changeView = this.changeView.bind(this);
      this.createUser = this.createUser.bind(this);
  }

  createUser(username) {
      chatkit.createUser({
          id: username,
          name: username,
      })
      .then((currentUser) => {
          this.setState({
              currentUsername: username,
              currentId: username,
              currentView: 'chatApp'
          })
      }).catch((err) => {
               if(err.status === 400) {
              this.setState({
                  currentUsername: username,
                  currentId: username,
                  currentView: 'chatApp'
              })
          } else {
              console.log(err.status);
          }
      });
  }

changeView(view) {
    this.setState({
        currentView: view
    })
}

render() {
      let view ='';

      if (this.state.currentView === "ChatMessage") {
          view = <ChatMessage  changeView={this.changeView}/>
      } else if (this.state.currentView === "signup") {
          view = <Signup onSubmit={this.createUser}/>
      } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentId={this.state.currentId} />
      }
      return (
          <div className="App">
              {view}
          </div>
      );
  }
}


export default App;