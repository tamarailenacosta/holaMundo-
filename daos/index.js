//Requiring DAOS Products
const ProductDAOMemory = require("./products/ProductDAOMemory");
const ProductDAOFile = require("./products/ProductDAOFile");
const ProductDAOMongoDB = require("./products/ProductDAOMongoDB");
const ProductDAOFirestore = require("./products/ProductDAOFirestore");
// Requiring DAOS Cart
const CartDAOMemory = require("./cart/CartDAOMemory");
const CartDAOMongoDB = require("./cart/CartDAOMongoDB");
const CartDAOFile = require("./cart/CartDAOFile");
const CartDAOFirestore = require("./cart/CartDAOFirestore");
const DAOS = {}
    // Products
if (process.env.STORAGE === "memory") DAOS["ProductDAO"] = ProductDAOMemory;
if (process.env.STORAGE === "file") DAOS["ProductDAO"] = ProductDAOFile;
if (process.env.STORAGE === "mongodb") DAOS["ProductDAO"] = ProductDAOMongoDB;
if (process.env.STORAGE === "firestore") DAOS["ProductDAO"] = ProductDAOFirestore;
// Cart
if (process.env.STORAGE === "memory") DAOS["CartDAO"] = CartDAOMemory;
if (process.env.STORAGE === "file") DAOS["CartDAO"] = CartDAOFile;
if (process.env.STORAGE === "mongodb") DAOS["CartDAO"] = CartDAOMongoDB;
if (process.env.STORAGE === "firestore") DAOS["CartDAO"] = CartDAOFirestore;
module.exports = DAOS;