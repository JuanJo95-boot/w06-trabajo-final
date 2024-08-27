require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Cart = require('../models/Cart')


let TOKEN
let product
let category
let cart
let userId
let purchaseId

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL_CART = '/api/v1/cart'
const BASE_URL = '/api/v1/purchase'

beforeAll(async () => {
    const hits = {
        email: "juan@gmail.com",
        password: "juan1234"
    }

    const res = await request(app)
      .post(BASE_URL_LOGIN)
      .send(hits)
      
    TOKEN = res.body.token
    //console.log(TOKEN); 
    userId = res.body.user.id 
    //console.log(res.body);

    category = await Category.create({name: 'Ropa para dama'})

    product = await Product.create({
        title: "Smart Tv",
        description: "Have 32 inches",
        price: 9.999,
        categoryId: category.id
    })

    cart = {
        //userId: userId,
        productId: product.id,
        quantity: 3
    }

    const res_cart = await request(app)
      .post(BASE_URL_CART)
      .send(cart)
      .set('Authorization', `Bearer ${TOKEN}`)
    //console.log(res_cart.body);
    
})

afterAll(async () => {
    await Category.destroy({where: {id: category.id}})
    await Product.destroy({where: {id: product.id}})
    //await Cart.destroy({where: {id: cart.id}})
})

test("POST -> 'BASE_URL', should return statusCode 201 and res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)

    purchaseId = res.body.id
    //console.log(res.body);

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body[0].quantity).toBe(cart.quantity)
    expect(res.body[0].userId).toBe(userId)
    expect(res.body[0].productId).toBe(product.id)

    const res_cart = await request(app)
      .get(BASE_URL_CART)
      .set('Authorization', `Bearer ${TOKEN}`)
    
      expect(res_cart.body).toHaveLength(0)
      //console.log(res_cart.body);
})

test("GET -> 'BASE_URL', should return statusCode 200 and res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
       .get(BASE_URL)
       .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].product.id).toBeDefined()
    expect(res.body[0].product.categoryId).toBeDefined()
    expect(res.body[0].product.id).toBe(product.id)
    expect(res.body[0].product.categoryId).toBe(category.id) 

    //console.log(res.body);
})


