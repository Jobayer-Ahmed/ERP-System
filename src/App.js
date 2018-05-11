import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';

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
				<Login login={ref.logintosignup}/>
			</div>
		);
	}
}

export default App;