import React from "react";
import "./style.css";

const SmallCard = ({ imageUrl, productDetail }) => {
   
    return (
        <div className="small-card-wrapper">
            <img
                src={imageUrl}
                // src={"/images/PbPEvolutionMarble.gif"}
                alt=""
            />
            <p>{productDetail}</p>
        </div >
    );
}

export default SmallCard;