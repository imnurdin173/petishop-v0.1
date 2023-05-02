import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Home extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 8,
    searchProductName: "",
    searhCategory: ""
  }

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({ productList: result.data, maxPage: Math.ceil(result.data.length / this.state.itemPerPage), filteredProductList: result.data })
        // alert('getAPI berhasil boys');
      })
      .catch((error) => {
        console.log(error);
        alert('getAPI error boys');
      })
  }

  renderProducts = () => {
    // const itemPerPage = 8;
    const indexAwal = (this.state.page - 1) * this.state.itemPerPage;
    const currentData = this.state.filteredProductList.slice(indexAwal, indexAwal + this.state.itemPerPage);

    // return this.state.productList.map((val) => {
    //   return <ProductCard productData={val} />

    return currentData.map((val) => {
      return <ProductCard productData={val} />
    });
  }

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  searchInputHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  searchBtnHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category.includes(this.state.searhCategory.toLowerCase());
    })

    this.setState({ filteredProductList, maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage), page: 1 })
  }

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return <div className="MainContain container mt-5">
      <div className="row">
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <strong>Options Filter</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchProductName">ProductName</label>
              <input onChange={this.searchInputHandler} type="text" name="searchProductName" className="form-control mb-3" />
              <label htmlFor="searchCategory">Product Category</label>
              <select onChange={this.searchInputHandler} name="searchCategory" className="form-control" id="">
                <option value="all">All</option>
                <option value="food">Food</option>
                <option value="suplements">Suplements</option>
                <option value="accessories">Aksesoris</option>
              </select>
              <button onClick={this.searchBtnHandler} className="btn btn-primary mt-3">
                Search
              </button>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="sortCategory">Sort</label>
              <select name="sortCategory" className="form-control" id="">
                <option value="">Default</option>
                <option value="">Lowest Price</option>
                <option value="">Highest Price</option>
                <option value="">A-Z</option>
                <option value="">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-between align-item-center">
              <button disabled={this.state.page === 1} onClick={this.prevPageHandler} className="btn btn-light">
                {"<"}
              </button>
              <div className="text-center">
                Page {this.state.page} of {this.state.maxPage}
              </div>
              <button disabled={this.state.page === this.state.maxPage} onClick={this.nextPageHandler} className="btn btn-light">
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-9">
        <div className="d-flex flex-wrap flex-row">
          {/* <ProductCard /> */}
          {this.renderProducts()}

        </div>
      </div>
    </div>
  }
}

export default Home;
