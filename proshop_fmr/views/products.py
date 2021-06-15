""" Api views for products """
from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from proshop_fmr.models import Product

product_bp = Blueprint('products', __name__, url_prefix='/api/products')


@product_bp.route('')
def list_index():
    """ 
    GET /api/products
    return [Product] or []
    """
    return jsonify(Product.objects)


@product_bp.route('/<product_id>')
def show(product_id):
    """
    GET /api/product/product_id
    return Product
    """
    if not ObjectId.is_valid(product_id):
        error_msg = {'message': f'Product not found for ({product_id})'}
        return error_msg, 404
    product = Product.objects.get(pk=product_id)
    if not product:
        error_msg = {'message': f'Product not found for ({product_id})'}
        return error_msg, 404
    return jsonify(product)


@product_bp.route('/seed')
def insertMany():
    Product.objects.delete()
    product1 = Product(
        name='Airpods Wireless Bluetooth Headphones',
        image='/images/airpods.jpg',
        description=
        'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
        brand='Apple',
        category='Electronics',
        price=89.99,
        countInStock=3,
        rating=4,
        numReviews=123,
        quantity=10
        )
    product1.save()

    product2 = Product(
        name='iPhone 11 Pro 256GB Memory',
        image='/images/phone.jpg',
        description=
        'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
        brand='Apple',
        category='Electronics',
        price=599.99,
        countInStock=10,
        rating=3,
        numReviews=512,
        quantity=10
    )
    product2.save()

    product3 = Product(
        name='Cannon EOS 80D DSLR Camera',
        image='/images/camera.jpg',
        description=
        'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        brand='Cannon',
        category='Electronics',
        price=929.99,
        countInStock=0,
        rating=0,
        numReviews=0,
        quantity=15,
    )
    product3.save()
    product4 = Product(
        name='Sony Playstation 4 Pro White Version',
        image='/images/playstation.jpg',
        description=
        'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
        brand='Sony',
        category='Electronics',
        price=399.99,
        countInStock=10,
        rating=0,
        numReviews=0,
        quantity=12,
    )
    product4.save()

    product5 = Product(
        name='Logitech G-Series Gaming Mouse',
        image='/images/mouse.jpg',
        description=
        'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
        brand='Logitech',
        category='Electronics',
        price=49.99,
        countInStock=7,
        rating=0,
        numReviews=0,
        quantity=14,
        )
    product5.save()
    product6 = Product(
        name='Amazon Echo Dot 3rd Generation',
        image='/images/alexa.jpg',
        description=
        'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
        brand='Amazon',
        category='Electronics',
        price=29.99,
        countInStock=0,
        rating=0,
        numReviews=0,
    )
    product6.save()
    return jsonify(Product.objects)
