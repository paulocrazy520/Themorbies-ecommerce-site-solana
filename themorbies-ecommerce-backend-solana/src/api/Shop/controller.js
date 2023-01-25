require('dotenv').config('../.env');
const axios = require('axios');
const { response } = require('../../app');

const { Product, Order, Category } = require('../../db');

exports.initTable = async (req_, res_) => {
    const _newProduct = new Product({
        product_name: "",
        price_sol: "0",
        serialNum: "0",
        total_count: "0",
        sell_count: "0",
        totalCount: "0",
        category_id: "0",
        product_image: ""
    });
    const _insertResult = await _newProduct.save();

    const _newOrder = new Order({
        account_id: "",
        product_id: "",
        product_count: "0",
        shipping_info: "",
        status: "shipping"  //ready, shipping, complete  
    });
    await _newOrder.save();
    return res_.send({ result: true, data: "" });
}

exports.getProducts = (req_, res_) => {
    Product.find({ ...req_.query }, function (err, docs) {
        if (err) {
            return res_.send({ result: false, error: err.message });
        }
        else {
            return res_.send({ result: true, data: docs });
        }
    });
}

exports.getCategories = (req_, res_) => {
    Category.find({ ...req_.query }, function (err, docs) {
        if (err) {
            return res_.send({ result: false, error: err.message });
        }
        else {
            return res_.send({ result: true, data: docs });
        }
    });
}

exports.getOrders = async (req_, res_) => {
    Order.find({ ...req_.query }, function (err, docs) {
        if (err) {
            return res_.send({ result: false, error: err.message });
        }
        else {
            return res_.send({ result: true, data: docs });
        }
    });
}

exports.getOrdersWithProduct = async (req_, res_) => {
    const OrderWithProduct = await Order.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "productRef"
            }
        }
    ]);

    console.log(OrderWithProduct)
    const result = [];
    if (OrderWithProduct && OrderWithProduct.length) {
        if (req_.query.account_id) {
            OrderWithProduct.filter((order, index) => {
                if (order.account_id == req_.query.account_id) {
                    result.push(order);
                    return true;
                }
            });
        }
        return res_.send({ result: true, data: result });
    }
    else
        return res_.send({ result: false, data: result });

}

exports.insertOrder = async (req_, res_) => {
    const _newCart = new Order({
        account_id: req_.body.account_id,
        product_id: req_.body.product_id,
        product_count: req_.body.product_count,
        shipping_info: "",
        status: req_.body.status  //ready, shipping, complete  
    });
    await _newCart.save();
    return res_.send({ result: true, data: "Order has been inserted successful." });
}

exports.updateOrder = async (req_, res_) => {
    try {
        console.log(req_.body);
        await Order.update(req_.body.query, { $set: req_.body.set });
        return res_.send({ result: true, data: "Order has been updated successful." });
    }
    catch (e) {
        return res_.send({ result: false, data: "Order update failed." });
    }
}

exports.deleteOrder = async (req_, res_) => {
    console.log(req_.body);
    try {
        await Order.deleteOne(req_.body);
        return res_.send({ result: true, data: "Order has been deleted successful." });
    }
    catch (e) {
        return res_.send({ result: false, data: "Order delete failed." });
    }
}
