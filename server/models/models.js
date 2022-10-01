import sequelize from '../bd.js';
import { DataTypes } from "sequelize";

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketProduct = sequelize.define('basket_product',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define('product',{
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:  {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DOUBLE, allowNull: false},
    rate:  {type: DataTypes.DOUBLE, defaultValue: 0},
    img:   {type: DataTypes.STRING}
})

const Type = sequelize.define('type', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:  {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequelize.define('brand', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:  {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rate = sequelize.define('rate', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:  {type: DataTypes.INTEGER, allowNull: false}
})

const ProductInfo = sequelize.define('product_info', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:  {type: DataTypes.STRING, unique: true, allowNull: false},
    desc:  {type: DataTypes.STRING}
})

const TypeBrand = sequelize.define('type_brand', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)
User.hasMany(Rate)
Rate.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rate)
Rate.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

export {
    User,
    Basket,
    BasketProduct,
    Product,
    ProductInfo,
    Type,
    Brand,
    Rate,
    TypeBrand
};