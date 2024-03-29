import React, { Component } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./Mainscreen.css";
class Mainscreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { allProd } = this.props;
    let prodObj = {};
    let prodArr = [];
    for (let i = 0; i < allProd.length; i++) {
      prodObj = {
        id: i,
        productId:allProd[i].prodId,
        name: allProd[i].prodName,
        category: allProd[i].categoryName,
        weight: allProd[i].weight,
        uploadDate: allProd[i].buyDate.split('T')[0],
        qnty: allProd[i].qnty,
        price: allProd[i].price,

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
        dataField: "productId",
        text: "Product Id"
      },
      {
        dataField: "name",
        text: "Product Name"
      },
      {
        dataField: "category",
        text: "Category"
      },
      {
        dataField: "weight",
        text: "Weight"
      },
      {
        dataField: "uploadDate",
        text: "Date"
      },
      {
        dataField: "qnty",
        text: "Quantity"
      },
      {
        dataField: "price",
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

export default Mainscreen;
