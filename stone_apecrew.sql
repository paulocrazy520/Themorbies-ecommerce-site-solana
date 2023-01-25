/*
 Navicat Premium Data Transfer

 Source Server         : cccccc
 Source Server Type    : MongoDB
 Source Server Version : 40418
 Source Host           : localhost:27017
 Source Schema         : stone_apecrew

 Target Server Type    : MongoDB
 Target Server Version : 40418
 File Encoding         : 65001

 Date: 06/12/2022 00:25:13
*/


// ----------------------------
// Collection structure for categories
// ----------------------------
db.getCollection("categories").drop();
db.createCollection("categories");

// ----------------------------
// Documents of categories
// ----------------------------
db.getCollection("categories").insert([ {
    _id: ObjectId("6380e7243185a48fb4a91528"),
    "category_title": "Summer Drop",
    "category_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif",
    createdAt: ISODate("2022-11-25T16:02:44.947Z"),
    updatedAt: ISODate("2022-11-25T16:02:44.947Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("6380e6eed140000026000180"),
    "category_title": "Accessories",
    createdAt: "2022-11-25 16:02:44.947",
    updatedAt: "2022-11-25 16:02:44.947",
    "category_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("6380e6f5d140000026000181"),
    "category_title": "Amsterdam",
    createdAt: "2022-11-25 16:02:44.947",
    updatedAt: "2022-11-25 16:02:44.947",
    "category_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("6380e6fad140000026000182"),
    "category_title": "CBD",
    createdAt: "2022-11-25 16:02:44.947",
    updatedAt: "2022-11-25 16:02:44.947",
    "category_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("categories").insert([ {
    _id: ObjectId("6380e708d140000026000183"),
    "category_title": "Collabs",
    createdAt: "2022-11-25 16:02:44.947",
    updatedAt: "2022-11-25 16:02:44.947",
    "category_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);

// ----------------------------
// Collection structure for orders
// ----------------------------
db.getCollection("orders").drop();
db.createCollection("orders");

// ----------------------------
// Documents of orders
// ----------------------------

// ----------------------------
// Collection structure for products
// ----------------------------
db.getCollection("products").drop();
db.createCollection("products");

// ----------------------------
// Documents of products
// ----------------------------
db.getCollection("products").insert([ {
    _id: ObjectId("6380e5d0c89ad2b23575f076"),
    "product_name": "My Product1",
    "price_sol": "0.2",
    "price_puff": "0",
    "total_count": "100",
    "sell_count": "0",
    "category_id": "6380e7243185a48fb4a91528",
    createdAt: ISODate("2022-11-25T15:57:04.874Z"),
    updatedAt: ISODate("2022-11-25T15:57:04.874Z"),
    __v: NumberInt("0"),
    "product_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6380e5e8c89ad2b23575f078"),
    "product_name": "My Product2",
    "price_sol": "0.2",
    "price_puff": "0",
    "total_count": "30",
    "sell_count": "30",
    "category_id": "6380e6eed140000026000180",
    createdAt: ISODate("2022-11-25T15:57:28.416Z"),
    updatedAt: ISODate("2022-11-25T15:57:28.416Z"),
    __v: NumberInt("0"),
    "product_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6380e5e9c89ad2b23575f07a"),
    "product_name": "My Product3",
    "price_sol": "0.1",
    "price_puff": "0",
    "total_count": "20",
    "sell_count": "0",
    "category_id": "6380e6eed140000026000180",
    createdAt: ISODate("2022-11-25T15:57:29.551Z"),
    updatedAt: ISODate("2022-11-25T15:57:29.551Z"),
    __v: NumberInt("0"),
    "product_image": "http://95.217.102.128/images/pencil.png"
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6380e5eac89ad2b23575f07c"),
    "product_name": "My Product4",
    "price_sol": "0.2",
    "price_puff": "0",
    "total_count": "20",
    "sell_count": "0",
    "category_id": "6380e6f5d140000026000181",
    createdAt: ISODate("2022-11-25T15:57:30.604Z"),
    updatedAt: ISODate("2022-11-25T15:57:30.604Z"),
    __v: NumberInt("0"),
    "product_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6380e7243185a48fb4a91527"),
    "product_name": "My Product5",
    "price_sol": "0.2",
    "price_puff": "0",
    "total_count": "10",
    "sell_count": "10",
    "category_id": "6380e6fad140000026000182",
    createdAt: ISODate("2022-11-25T16:02:44.953Z"),
    updatedAt: ISODate("2022-11-25T16:02:44.953Z"),
    __v: NumberInt("0"),
    "product_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6380f7f797a50e07e83088fd"),
    "product_name": "My Product6",
    "price_sol": "0.2",
    "price_puff": "0",
    "total_count": "10",
    "sell_count": "10",
    "category_id": "6380e708d140000026000183",
    createdAt: ISODate("2022-11-25T17:14:31.671Z"),
    updatedAt: ISODate("2022-11-25T17:14:31.671Z"),
    __v: NumberInt("0"),
    "product_image": "http://95.217.102.128/images/PbPEvolutionMarble.gif"
} ]);

// ----------------------------
// Collection structure for system.views
// ----------------------------
db.getCollection("system.views").drop();
db.createCollection("system.views");

// ----------------------------
// Documents of system.views
// ----------------------------
