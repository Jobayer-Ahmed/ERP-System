import React, { Component } from 'react';
import Confirmcode from './Confirmcode/Confirmcode'
import './Reset.css';
const reset = require('./reset.png')

class Reset extends Component {
	constructor(props) {
		super(props);
		const ref = this;
		ref.state = {
			newpassword: false,
		}
		ref.back = ref.back.bind(ref)
	}

	back() {
		const ref = this;
		ref.setState({
			newpassword: !ref.state.newpassword,
		})
	}

	render() {
		const ref = this;
		return (
			<div className="Reset">
				<div className={ref.state.newpassword ? "mail hide" : "mail" }>
					<div className="card">
						<div className="goback text-left">
							<button className="back" onClick={ref.props.back}>
								<i className="ion-reply"></i>
							</button>
						</div>
						<div className="img">
							<img src={reset} alt="Login Image"/>
						</div>
						<div className="text">
							<b>Reset password</b> <br/>
							<div>Enter your email address in the form bellow and we will send <br/> you further instructions on how to reset your password.</div>
						</div>
						<div className="inputs">
							<input type="text" placeholder="Email address"/>
						</div>
						<div className="submit text-center no-gutter">
							<button className="big" onClick={() => ref.setState({newpassword: !ref.state.newpassword})}>Send activation code</button>
						</div>
					</div>
				</div>
				<div className={ref.state.newpassword ? "change" : "change hide" }>
					<Confirmcode back={ref.back}/>
				</div>
			</div>
		);
	}
}

export default Reset;
