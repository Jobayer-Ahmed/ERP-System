import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Signup from './Signup/Signup';

class App extends Component {
	constructor(props) {
		super(props);
		const ref = this;
		ref.state = {
			hideusernametopassword: false,
		}
		ref.logintosignup = ref.logintosignup.bind(ref);
	}

	logintosignup() {
		const ref = this;
		ref.setState({
			hideusernametopassword: !ref.state.hideusernametopassword,
		})
	}

	render() {
		const ref = this;
		return (
			<div className="App">
				<div className={ref.state.hideusernametopassword ? "login hide" : "login" }><Login login={ref.logintosignup}/></div>
				<div className={ref.state.hideusernametopassword ? "signup" : "signup hide" }><Signup login={ref.logintosignup}/></div>
			</div>
		);
	}
}

export default App;
