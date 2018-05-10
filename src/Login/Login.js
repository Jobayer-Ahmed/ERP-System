import React, { Component } from 'react';
import './Login.css';
import Reset from './Reset/Reset'
const login = require('./login.png')

class Login extends Component {
	constructor(props) {
		super(props);
		const ref = this;
		ref.state = {
			recoverpass: false,
		}
		ref.back = ref.back.bind(ref)
	}

	back() {
		const ref = this;
		ref.setState({
			recoverpass: !ref.state.recoverpass,
		})
	}

	render() {
		const ref = this;
		return (
			<div className="Login">
				<div className={ref.state.recoverpass ? "log hide" : "log" }>
					<div className="card">
						<div className="img">
							<img src={login} alt="Login Image"/>
						</div>
						<div className="text">
							<b>Login</b> <br/>
							<div>Enter your credentials bellow</div>
						</div>
						<div className="inputs">
							<input type="text" placeholder="Username"/> <br/><br/>
							<input type="text" placeholder="Password"/>
						</div>
						<div className="submit">
							<label>
								<input type="radio"/>
								<b>Remember me</b>
							</label>
							<button className="sub">LOGIN</button>
						</div>
					</div>
					<div className="forgot">
						<b>Don't have any account? <a className="a" onClick={ref.props.login}><u>Create new account</u></a></b>
					</div>
					<br/>
					<div className="forgot small">
						<b>Forgot password? <a className="a" onClick={() => ref.setState({recoverpass: !ref.state.recoverpass})}><u>Reset password</u></a></b>
					</div>
				</div>
				<div className={ref.state.recoverpass ? "reset" : "reset hide" }>
					<Reset back={ref.back}/>
				</div>
			</div>
		);
	}
}

export default Login;
