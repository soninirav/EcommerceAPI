# EcommerceAPI

I have developed a comprehensive e-commerce REST API project featuring essential functionalities such as user-friendly cart access, seamless product creation and modification, secure user login and signup, robust JWT token authentication for data protection, streamlined order placement, and convenient retrieval of order details for a smooth and efficient online shopping experience.

Please refer to the following for a list of REST API endpoints to use the application:

1. [Sign Up](#signup)
2. [Log In](#login)
3. [Register/Deregister Seller](#registerderegister-as-a-seller)
4. [Create Product](#create-product)
5. [Update Product](#update-product)
6. [Get Product](#get-product)
7. [Get All Products](#get-all-products)
8. [Delete Product](#delete-product)
9. [Get Cart Items](#get-cart-items)
10. [Add Product to Cart](#add-product-to-cart)
11. [Remove Product From Cart](#remove-product-from-cart)
12. [Place Order](#place-order)
13. [Get Order Details](#get-order-details)

## SignUp

#### Description : This request will be used for creating user

#### Method : `POST`

#### Request URL : `/users/signup`

#### Request Headers :

```
Content-Type: application/json
```

##### Body

```
{
    "email": "test@test.com",
    "password": "123456",
    "name":"test"
}
```

## Login

#### Description : This request will validate a user and will return jwt token on successfull verification.

#### Method : `POST`

#### Request URL : `/users/login`

#### Request Headers :

```
Content-Type: application/json
```

##### Body

```
{
    "email": "test@test.com",
    "password": "123456"
}
```

## Register/Deregister as a Seller

#### Description : This request will convert existing user to a seller or deregister as well

#### Method : `PATCH`

#### Request URL : `users/becomeseller`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

##### Body

```
{
    "isSeller":false
}
```

## Create Product

#### Description : This request will create a product if user who is requesting is registered as seller

#### Method : `POST`

#### Request URL : `/users/login`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

##### Body

```
{
    "title":"prdocut title",
    "price":123.30,
    "description":"description",
    "imageUrl":"www.google.com/images/126hab7H"
}
```

## Update Product

#### Description : This request will update a product if product has been created by requesting user

#### Method : `PUT`

#### Request URL : `/products/<productId>`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

##### Body

```
{
    "title":"Product Updated",
    "price":13.30,
    "description":"description Updated",
    "imageUrl":"www.google.com/images/KaQ12B41bs&1"
}
```

## Get Product

#### Description : This request will retrieve a product details of given product ID if exists

#### Method : `GET`

#### Request URL : `/products/<productId>`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

## Get All Products

#### Description : This request will retrieve all products

#### Method : `GET`

#### Request URL : `/products`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

## Delete Product

#### Description : This request will delete a product details of given product ID if exists and requesting owner has created product

#### Method : `DELETE`

#### Request URL : `/products/<productId>`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

## Get Cart Items

#### Description : This request will retrieve all products from cart added by requesting user

#### Method : `GET`

#### Request URL : `/cart`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

## Add Product to Cart

#### Description : This request will add a product to cart for logged in user

#### Method : `POST`

#### Request URL : `/cart`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

##### Body

```
{
    "productId":"64fefb235cbbb47410304ed1",
    "quantity":10
}
```

## Remove Product From Cart

#### Description : This request will remove a product from cart for logged in user

#### Method : `DELETE`

#### Request URL : `/cart/delete`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

##### Body

```
{
    "productId":"64fefb235cbbb47410304ed1"
}
```

## Place Order

#### Description : This request will place order for all items from cart

#### Method : `POST`

#### Request URL : `/order`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```

## Get Order Details

#### Description : This request will retreive order details for logged in user

#### Method : `GET`

#### Request URL : `/myorder`

#### Request Headers :

```
Content-Type: application/json
Authorization : Bearer <token>
```
