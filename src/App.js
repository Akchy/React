import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      newuser: '',
      newpass: '',
      newname:'',
      flag:1,
      codecheck: null,
      error: '',
      errorcheck: 0
    };
    this.userhandleChange = this.userhandleChange.bind(this);
    this.passhandleChange = this.passhandleChange.bind(this);
    this.setvalue = this.setvalue.bind(this);
  }
  userhandleChange(event) {
    this.setState({user: event.target.value});
  }
  passhandleChange(event) {
    this.setState({pass: event.target.value});
  }
  setvalue =() => {
    
    var rootRef =firebase.database().ref().child('doc');
    const post = rootRef.orderByKey();
    var newuser,newpass;
  
     post.on('value', snap => {
       snap.forEach(child => {
        this.setState({
          newuser: child.key,
          newpass: child.val().pass
        });
        if((this.state.newuser===this.state.user) && (this.state.newpass===this.state.pass)){
          this.setState({newname:child.val().name,errorcheck:1,flag:0});      
        }
      });
    });
    if(this.state.errorcheck===0) {
      this.state.error = <div>
        <p className='error'>Enter all field correctly!!</p>
      </div>
    }
  }

  logout = () => {
    this.setState({flag:1,errorcheck:0,error:''});
  }

  render() {

    if(this.state.flag===1){
      this.state.codeCheck=(
      <div>
        <h2>Log In</h2>
        {this.state.error}
      <label>Username</label>&nbsp;&nbsp;&nbsp;
      <input type="text" value={this.state.user} onChange={this.userhandleChange} placeholder=''/>
      <br/><br/>
      <label>Password</label>&nbsp;&nbsp;&nbsp;
      <input type="password" value={this.state.pass} onChange={this.passhandleChange} placeholder=''/>
      <br/><br/>
      <button className='btn' onClick={this.setvalue}>Log In</button>
      </div>
      );
      
    }
    if(this.state.flag===0){
      this.state.codeCheck=(
        <div>
          <h1>Welcome {this.state.newname}</h1>
          <button className='btn' onClick={this.logout}>Log Out</button>
        </div>
      );
    }
    return (
      <div className="App">
      {this.state.codeCheck}
      </div>
    );
  }
}

export default App;
