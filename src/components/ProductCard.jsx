import React from "react";
import * as Icon from "react-bootstrap-icons";

class ProductCard extends React.Component {
    render() {
        return (
            <div className="" id="productCard">
                <div className="card product-card">
                    <img src={this.props.productData.productImage} alt="" />
                    <div className="mt-2">
                        <div>
                            <h5>{this.props.productData.productName}</h5>
                            <span className="text-muted">{this.props.productData.productPrice}</span>
                        </div>
                        <div className="BtnCard d-flex flex-row justify-content-center">
                            <button className="btnLove mx-2" style={{ background: "none" }}>
                                <Icon.Heart />
                            </button>
                            <button className="btnCard btn btn-success mt-2">add to cart</button>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

export default ProductCard;
