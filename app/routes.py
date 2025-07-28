from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route("/")
def home():
    return render_template("home.html")

@main_bp.route("/about_f1")
def about_f1():
    return render_template("about_f1.html")
