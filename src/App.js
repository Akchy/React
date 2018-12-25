import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      user1: '',
      pass1: '',
      name: '',
      newuser: '',
      newpass: '',
      newname:'',
      flag:1,
      codecheck: null,
      error: '',
      errorcheck: 0,
      log_reg:0,
      reg_suc:'',
      reg_check:0,
    };
    this.namehandleChange = this.namehandleChange.bind(this);
    this.userhandleChange = this.userhandleChange.bind(this);
    this.passhandleChange = this.passhandleChange.bind(this);
    this.userhandleChange1 = this.userhandleChange1.bind(this);
    this.passhandleChange1 = this.passhandleChange1.bind(this);
    this.setvalue = this.setvalue.bind(this);
  }
  userhandleChange(event) {
    this.setState({user: event.target.value,error:'',errorcheck:0});
  }
  passhandleChange(event) {
    this.setState({pass: event.target.value,error:'',errorcheck:0});
  }
  namehandleChange(event) {
    this.setState({name: event.target.value,reg_suc:'',reg_check:0});
  }

  userhandleChange1(event) {
    this.setState({user1: event.target.value,reg_suc:'',reg_check:0});
  }
  passhandleChange1(event) {
    this.setState({pass1: event.target.value,reg_suc:'',reg_check:0});
  }
  setvalue =() => {
    
    var rootRef =firebase.database().ref().child('doc');
    rootRef.once('value', snap => {
      snap.forEach(child => {
        if((child.val().user===this.state.user) && (child.val().pass===this.state.pass)){
          this.setState({newname:child.val().name,errorcheck:1,flag:0});      
        }
      });
      if(this.state.errorcheck===0) {
        const error = (
        <div>
          <p className="error">Invalid Username or Password!!</p>
        </div>
        );
        this.setState({error:error});
      }
    });
    
  }


  


  register = () =>{
    this.setState({reg_check:0});
    var rootRef =firebase.database().ref().child('doc');
    rootRef.once('value', snap => {
      snap.forEach(child => {
       
        if(this.state.user1===child.val().user){
          
          this.setState({reg_check:1});      
        }
       
      });
      
      if(this.state.user1.length!==0 && this.state.pass1.length!==0 && this.state.name.length!==0 &&
         this.state.reg_check===0)
      {
       rootRef.push({name:this.state.name,user:this.state.user1,pass:this.state.pass1});
        const reg_suc=(
          <div>
            <h3 className="textgreen">Registeration Success</h3><br/>
          </div>
        );
        this.setState({user1:'',pass1:'',name:'',reg_suc:reg_suc})
      }
      if(this.state.reg_check===1){
        const reg_suc=(
          <div>
            <p className="error">Username Unavailable</p><br/>
          </div>
        );
        this.setState({reg_suc:reg_suc});
        
      }
    });
    
  }

  logout = () => {
    this.setState({flag:1,errorcheck:0,error:''});
  }

  login = () =>{
    this.setState({log_reg:0,user:'',pass:'',flag:1,errorcheck:0,error:''});
  }

  reg = () => {
    this.setState({log_reg:1,reg_suc:'',reg_check:0});
  }

  render() {

    if(this.state.log_reg===0){
      if(this.state.flag===1){
        this.state.codeCheck=(
        <div>
          {this.state.error}
        <label>Username</label>&nbsp;&nbsp;&nbsp;
        <input type="text" value={this.state.user} onChange={this.userhandleChange} placeholder=''/>
        <br/><br/>
        <label>Password</label>&nbsp;&nbsp;&nbsp;
        <input type="password" value={this.state.pass} onChange={this.passhandleChange} placeholder=''/>
        <br/><br/>
        <button className='btn blue' onClick={this.setvalue}>Log In</button>
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
    }
    if(this.state.log_reg===1){
      this.state.codeCheck=(
        <div>
          {this.state.reg_suc}
        <label>Full Name</label>&nbsp;&nbsp;&nbsp;
        <input type="text" value={this.state.name} onChange={this.namehandleChange} placeholder=''/>
        <br/><br/>
        <label>Username</label>&nbsp;&nbsp;&nbsp;
        <input type="text" value={this.state.user1} onChange={this.userhandleChange1} placeholder=''/>
        <br/><br/>
        <label>Password</label>&nbsp;&nbsp;&nbsp;
        <input type="password" value={this.state.pass1} onChange={this.passhandleChange1} placeholder=''/>
        <br/><br/>
        <button className='btn' onClick={this.register}>Register</button>
        </div>
        );
    }
    return (
      <div className="App">
        <div className="row">
          <input type="submit" className="btn green" id="btnSearch" onClick={this.login} value="Login"/>
          <input type="submit" className="btn red" id="btnClearSearch" onClick={this.reg} value="Register"/>
          <br/><br/>
        </div>
      {this.state.codeCheck}
      </div>
    );
  }
}

export default App;
