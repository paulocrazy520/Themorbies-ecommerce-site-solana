import React from "react";
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import "./style.css";

const ProductCard = ({ imageUrl, productDetail }) => {

    productDetail.total_count = parseInt(productDetail.total_count);
    productDetail.sell_count = parseInt(productDetail.sell_count);
    productDetail.price_sol = parseFloat(productDetail.price_sol);
    productDetail.price_puff = parseFloat(productDetail.price_puff);
    const toUrl = "/product/" + productDetail._id;
    console.log("************Url=", toUrl);
    return (
        <Link className="product-card-wrapper" to={toUrl}>
            <div className="product-image">
                <img
                    src={imageUrl}
                    // src="/images/PbPEvolutionMarble.gif"
                    alt=""
                />
            </div>
            <div className="product-detail">
                <p>{productDetail.total_count <= productDetail.sell_count ? "Sold Out" : productDetail.total_count + "/" + productDetail.sell_count}</p>
                <p>{productDetail.product_name}</p>
                <p>{"Price"}</p>
                <p>{(productDetail.price_sol > 0 ? productDetail.price_sol + " SOL" + " + " : "") + productDetail.price_puff + " PBP"}</p>
            </div>
        </Link >
    );
}

export default ProductCard;