import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class SellForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { categoryName, prodName, prodId, sellQnty, price } = this.state;
    this.props.sellProduct(categoryName, prodName, prodId, sellQnty, price);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="add-product container">
        <h2 className="text-center">Add selling product requirements</h2>
        <small className="text-center text-muted">* = require fields</small>
        <br />
        <div className="text-danger">
          {this.props.warning ? "Please provide required fields" : ""}
          {this.props.error ? this.props.error : ""}
        </div>
        <br />
        <div className="text-left">
          <Form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-6">
                <FormGroup>
                  <Input
                    type="text"
                    name="prodName"
                    placeholder="* Product Name"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup>
                  <Input
                    type="text"
                    name="categoryName"
                    placeholder="* Product Category"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup>
                  <Input
                    type="text"
                    name="prodId"
                    placeholder="* Product ID"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup>
                  <Input
                    type="number"
                    name="sellQnty"
                    placeholder="* Product Quantity"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup>
                  <Input
                    type="number"
                    name="price"
                    placeholder="* Product Price"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </div>
            </div>
            <button type="submit" className="btn btn-info btn-sm">
              Submit
            </button>
          </Form>
          <br />
        </div>
      </div>
    );
  }
}

export default SellForm;
