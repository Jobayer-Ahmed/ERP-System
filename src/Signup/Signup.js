import React, { Component } from 'react';
import './Signup.css';
const login = require('./login.png')

class Signup extends Component {
	constructor(props) {
		super(props);
		const ref = this;
		ref.state = {
			fullname: '',
			username: '',
			email: '',
			mobile: '',
			password: '',
			repeatpassword: ''
		}
		ref.repeatpassword = ref.repeatpassword.bind(ref);
		ref.submit = ref.submit.bind(ref);
	}

	repeatpassword(e) {
		const ref = this;
		ref.setState({
			repeatpassword: e.target.value
		})
	}

	submit() {
		const ref = this;
		let x = ref.state.password, y = ref.state.repeatpassword;
		if (x!==y) {
			alert("Password Not Match");
		} else {
			console.log("Password Matched");
		}
	}

	render() {
		const ref = this;
		return (
			<div className="Signup">
				<div className="card">
					<div className="goback text-left">
						<button className="back" onClick={ref.props.login}>
							<i className="ion-reply"></i>
						</button>
					</div>
					<div className="img">
						<img src={login} alt="Login Image"/>
					</div>
					<div className="text">
						<b>Create new account</b> <br/>
						<div>Enter your credentials bellow</div>
					</div>
					<div className="inputs">
						<div className="double">
							<input type="text" placeholder="Full Name" value={ref.state.fullname} onChange={(e) => ref.setState({fullname: e.target.value})}/>
							<input type="text" placeholder="Username" value={ref.state.username} onChange={(e) => ref.setState({username: e.target.value})}/>
						</div>
						<input type="text" placeholder="Email address" value={ref.state.email} onChange={(e) => ref.setState({email: e.target.value})}/>
						<div className="double">
							<input type="text" placeholder="Mobile number" value={ref.state.mobile} onChange={(e) => ref.setState({mobile: e.target.value})}/>
							<input type="text" placeholder="City"/>
						</div>
						<input type="text" placeholder="Password" value={ref.state.password} onChange={(e) => ref.setState({password: e.target.value})}/>
						<input type="text" placeholder="Repeat password" value={ref.state.repeatpassword} onChange={ref.repeatpassword}/>
					</div>
					<div className="submit">
						<label>
							<input type="radio" />
							<b>I accept the <a className="a">Conditions</a></b>
						</label>
						<button className="sub" onClick={ref.submit}>Create new account</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;