import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login/Login";
import Mainscreen from "./Mainscreen/Mainscreen";
import SoldScreen from "./SoldScreen/SoldScreen";
import AddForm from "./Form/Form";
import SellForm from "./Form/sellForm";

class App extends Component {
  constructor(props) {
    super(props);
    const ref = this;
    ref.state = {
      showForm: false,
      showMain: false,
      showLogin: true,
      sellForm: false,
      showSoldScreen: false,
      username: "test123",
      password: "test123",
      usernameerror: false,
      passworderror: false,
      allProd: {},
      error: "",
      user: {},
      warning: ""
    };
    ref.login = ref.login.bind(ref);
    ref.valueusername = ref.valueusername.bind(ref);
    ref.valuepassword = ref.valuepassword.bind(ref);
    ref.onClickAddButton = ref.onClickAddButton.bind(ref);
    ref.goback = ref.goback.bind(ref);
    ref.addProduct = ref.addProduct.bind(ref);
    ref.logout = ref.logout.bind(ref);
    ref.sellProduct = ref.sellProduct.bind(ref);
    ref.onClickSellButton = ref.onClickSellButton.bind(ref);
    ref.onClickSoldScrenButton = ref.onClickSoldScrenButton.bind(ref);
    ref.getAllProd = ref.getAllProd.bind(ref);
  }

  valueusername(e) {
    const ref = this;
    ref.setState({
      username: e.target.value
    });
  }

  valuepassword(e) {
    const ref = this;
    ref.setState({
      password: e.target.value
    });
  }

  login() {
    const ref = this;
    axios
      .post("https://great-airport.glitch.me/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.data.message) {
          this.setState({ error: res.data.message });
        } else {
          this.setState({
            user: res.data,
            showMain: true,
            showForm: false,
            showLogin: false
          });
        }
      })
      .catch(err => this.setState({ error: err.response.data }));
  }
  logout() {
    axios.get("https://great-airport.glitch.me/auth/logout").then(res => {
      this.setState({
        user: res.data,
        showMain: false,
        showForm: false,
        showLogin: true
      });
    });
  }
  getAllProd(){
    axios
      .get("https://great-airport.glitch.me/all-product")
      .then(res => {
        if (res.data.message) {
          this.setState({ warning: res.data.message });
        } else {
          this.setState({ allProd: res.data });
        }
      })
      .catch(err => {
        this.setState({ error: err.response.data });
      });
  }
  componentWillMount() {
    this.getAllProd()
  }
  onClickAddButton() {
    this.setState({
      showForm: !this.state.showForm,
      showMain: !this.state.showMain
    });
  }
  onClickSellButton() {
    this.setState({
      showForm: false,
      showMain: false,
      sellForm: true
    });
  }
  onClickSoldScrenButton() {
    this.setState({
      showForm: false,
      showMain: false,
      sellForm: false,
      showSoldScreen: true
    });
  }
  goback() {
    this.setState({
      showForm: false,
      showMain: true,
      showLogin: false,
      sellForm: false,
      showSoldScreen: false
    });
  }
  addProduct(categoryName, prodName, prodId, qnty, weight, price, buyDate) {
    axios
      .post("https://great-airport.glitch.me/add-product", {
        categoryName,
        prodName,
        prodId,
        qnty,
        weight,
        price
      })
      .then(res => {
        if (res.data.message) {
          this.setState({ warning: res.data.message });
        } else {
          this.setState({ allProd: res.data, showForm: false, showMain: true });
        }
      })
      .catch(err => {
        this.setState({ error: err.response.data });
      });
  }
  sellProduct(categoryName, prodName, prodId, sellQnty, price) {
    axios
      .post("https://great-airport.glitch.me/sell-product", {
        categoryName,
        prodName,
        prodId,
        sellQnty,
        price
      })
      .then(res => {
        if (res.data.msg) {
          this.setState({ error: res.data.msg });
        } else {
          this.setState({
            soldProd: res.data.soldProd,
            allProd: res.data.allProd,
            showForm: false,
            showMain: true,
            sellForm: false
          });
        }
      })
      .catch(err => {
        this.setState({ error: err.response.data });
      });
  }
  render() {
    const ref = this;
    return (
      <div className="App">
        <div style={{ display: this.state.showLogin ? "block" : "none" }}>
          <Login
            usename={ref.state.usename}
            password={ref.state.password}
            changepass={ref.valuepassword}
            cahngeuser={ref.valueusername}
            login={ref.login}
            cheakusrname={ref.state.usernameerror}
            cheakpass={ref.state.passworderror}
            {...this.state}
          />
        </div>
        <div className="container text-left">
          <button
            className="btn btn-info btn-sm"
            onClick={this.onClickAddButton}
            style={{ display: this.state.showMain ? "inline-block" : "none" }}
          >
            Add Product
          </button>
          <button
            className="btn btn-info btn-sm ml-1"
            onClick={this.onClickSellButton}
            style={{ display: this.state.showMain ? "inline-block" : "none" }}
          >
            Sell Product
          </button>
          <button
            className="btn btn-info btn-sm ml-1"
            onClick={this.onClickSoldScrenButton}
            style={{ display: this.state.showMain ? "inline-block" : "none" }}
          >
            Sold products
          </button>
        </div>
        <div style={{ display: this.state.showMain ? "block" : "none" }}>
          <Mainscreen {...this.state} />
        </div>
        <div style={{ display: this.state.showSoldScreen ? "block" : "none" }}>
          <SoldScreen {...this.state} />
          <div className="text-center">
            <div className="btn btn-light btn-xs" onClick={this.goback}>
              Go Back
            </div>
          </div>
        </div>
        <div
          style={{
            display: this.state.showForm ? "block" : "none"
          }}
        >
          <AddForm {...this.state} addProduct={this.addProduct} />
          <div className="text-center">
            <div className="btn btn-light btn-xs" onClick={this.goback}>
              Go Back
            </div>
          </div>
        </div>
        <div
          style={{
            display: this.state.sellForm ? "block" : "none"
          }}
        >
          <SellForm {...this.state} sellProduct={this.sellProduct} />
          <div className="text-center">
            <div className="btn btn-light btn-xs" onClick={this.goback}>
              Go Back
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default App;
