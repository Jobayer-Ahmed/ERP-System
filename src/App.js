import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Mainscreen from './Mainscreen/Mainscreen';

class App extends Component {
	constructor(props) {
		super(props);
		const ref = this;
		ref.state = {
			hideusernametopassword: false,
			username: '',
			password: '',
			usernameerror: false,
			passworderror: false,
		}
		ref.login = ref.login.bind(ref);
		ref.valueusername = ref.valueusername.bind(ref);
		ref.valuepassword = ref.valuepassword.bind(ref);
	}

	valueusername(e){
		const ref = this;
		ref.setState({
			username: e.target.value,
		})
	}

	valuepassword(e) {
		const ref = this;
		ref.setState({
			password: e.target.value,
		})
	}

	login() {
		const ref = this;
		if (ref.state.username !== 'admin') {
			ref.setState({
				usernameerror: true,
				passworderror: false,
			})
		} else if(ref.state.password !== 'admin') {
			ref.setState({
				usernameerror: false,
				passworderror: true,
			})
		} else {
			ref.setState({
				hideusernametopassword: !ref.state.hideusernametopassword,
				passworderror: false,
				usernameerror: false,
			})
		}
	}

	render() {
		const ref = this;
		return (
			<div className="App">
				<div className={ref.state.hideusernametopassword ? "login hide" : "login" }><Login usename={ref.state.usename} password={ref.state.password} changepass={ref.valuepassword} cahngeuser={ref.valueusername} login={ref.login} cheakusrname={ref.state.usernameerror} cheakpass={ref.state.passworderror}/></div>
				<div className={ref.state.hideusernametopassword ? "mainscreen" : "hide" }><Mainscreen /></div>
			</div>
		);
	}
}

export default App;