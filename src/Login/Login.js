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
							<div className="usrname">
								<input type="text" placeholder="Username" value={ref.props.username} onChange={ref.props.cahngeuser}/>
								<br/>
								<div className={ref.props.cheakusrname ? 'username_error_label label' : 'username_error_label label hide'}>username doesn't exist</div>
							</div>
							<div className="password">
								<input type="text" placeholder="Password" value={ref.props.password} onChange={ref.props.changepass}/>
								<br/>
								<div className={ref.props.cheakpass ? 'password_error_label label' : 'password_error_label label hide'}>incorrect password</div>
								<br/>
							</div>
						</div>
						<div className="submit">
							<label>
								<input type="radio"/>
								<b>Remember me</b>
							</label>
							<button className="sub" onClick={ref.props.login}>LOGIN</button>
						</div>
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
