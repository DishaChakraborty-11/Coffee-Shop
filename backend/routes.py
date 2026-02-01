from flask import Blueprint, request, jsonify
from models import db, MenuItem, Order, Contact

api = Blueprint("api", __name__)

# ---------------- MENU ----------------
@api.route("/menu", methods=["GET"])
def get_menu():
    items = MenuItem.query.all()
    return jsonify([
        {
            "id": i.id,
            "name": i.name,
            "price": i.price,
            "category": i.category,
            "image": i.image
        } for i in items
    ])

# ---------------- ORDER ----------------
@api.route("/order", methods=["POST"])
def place_order():
    data = request.json
    order = Order(
        customer_name=data["name"],
        item=data["item"],
        quantity=data["quantity"],
        total_price=data["total"]
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({"message": "Order placed successfully!"}), 201

# ---------------- CONTACT ----------------
@api.route("/contact", methods=["POST"])
def contact():
    data = request.json
    msg = Contact(
        name=data["name"],
        email=data["email"],
        message=data["message"]
    )
    db.session.add(msg)
    db.session.commit()
    return jsonify({"message": "Message sent!"}), 201
