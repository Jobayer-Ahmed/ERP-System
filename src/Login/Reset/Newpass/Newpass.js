import React, { Component } from 'react';
import './Newpass.css';
const reset = require('./reset.png')

class Newpass extends Component {

	render() {
		return (
			<div className="Newpass">
				<div className="mail">
					<div className="card">
						<div className="img">
							<img src={reset} alt="Login Image"/>
						</div>
						<div className="text">
							<b>Enter new password</b> <br/>
							<div>Enter a brand new password twice for setup new password.</div>
						</div>
						<div className="inputs">
							<input type="text" placeholder="Password"/> <br/><br/>
							<input type="text" placeholder="Repeat password"/>
						</div>
						<div className="submit text-center no-gutter">
							<button className="big">Send activation code</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Newpass;
