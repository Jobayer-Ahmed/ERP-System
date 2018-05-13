import React, { Component } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
class SoldScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      soldProd: {},
      warning: '',
      error: ''
    }
  }
  componentWillMount() {
    axios
      .get("https://great-airport.glitch.me/all-sold-product")
      .then(res => {
        if (res.data.message) {
          this.setState({ warning: res.data.message });
        } else {
          this.setState({ soldProd: res.data });
        }
      })
      .catch(err => {
        this.setState({ error: err.response.data });
      });
  }
  render() {
    const { soldProd } = this.state;
    let prodObj = {};
    let prodArr = [];
    for (let i = 0; i < soldProd.length; i++) {
      prodObj = {
        id: i,
        prodId:soldProd[i].prodId,
        prodName: soldProd[i].prodName,
        categoryName: soldProd[i].categoryName,
        sellDate: soldProd[i].sellDate.split('T')[0],
        sellQnty: soldProd[i].sellQnty,
        totalPrice: soldProd[i].totalPrice,

      };
      prodArr.push(prodObj)
    }
    var products = prodArr;
    const options = {
      paginationSize: 4,
      pageStartIndex: 0,
      alwaysShowAllBtns: false, // Always show next and previous button
      withFirstAndLast: true, // Hide the going to First and Last page button
      hideSizePerPage: true, // Hide the sizePerPage dropdown always
      hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: "<<",
      prePageText: "<",
      nextPageText: ">",
      lastPageText: ">>",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "All",
          value: products.length
        }
      ] // A numeric array is also available. the purpose of above example is custom the text
    };
    const columns = [
      {
        dataField: "id",
        text: "Serial no."
      },
      {
        dataField: "prodId",
        text: "Product Id"
      },
      {
        dataField: "prodName",
        text: "Product Name"
      },
      {
        dataField: "categoryName",
        text: "Category"
      },
      {
        dataField: "sellDate",
        text: "Date"
      },
      {
        dataField: "sellQnty",
        text: "Quantity"
      },
      {
        dataField: "totalPrice",
        text: "Price"
      }
    ];
    return (
      <div className="Mainscreen py-4 container">
        <BootstrapTable
          columns={columns}
          striped
          hover
          condensed
          keyField="id"
          data={products}
          columns={columns}
          pagination={paginationFactory(options)}
        />
      </div>
    );
  }
}

export default SoldScreen;
