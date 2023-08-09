from flask import Blueprint, request
from pynput.mouse import Button, Controller as MouseController

mouse_api = Blueprint('mouse', __name__, url_prefix='/mouse')

mouse=MouseController()
pressing = False

@mouse_api.route("/click")
def click():
    args = request.args
    x = int(args.get('x'))
    y = int(args.get('y'))

    mouse.position = (x, y)
    mouse.click(Button.left, 1)
    return [x, y]

@mouse_api.route("/rightclick")
def rightclick():
    args = request.args
    x = int(args.get('x'))
    y = int(args.get('y'))

    mouse.position = (x, y)
    mouse.click(Button.right, 1)
    return [x, y]

@mouse_api.route("/mousedown")
def mousedown():
    global pressing

    args = request.args
    x = int(args.get('x'))
    y = int(args.get('y'))

    pressing = True

    mouse.position = (x, y)
    mouse.press(Button.left)
    return [x, y]

@mouse_api.route("/mouseup")
def mouseup():
    global pressing

    # args = request.args
    # x = int(args.get('x'))
    # y = int(args.get('y'))

    pressing = False

    # mouse.position = (x, y)
    mouse.release(Button.left)
    return {"msg": "OK"}

@mouse_api.route("/mousemove")
def mousemove():
    args = request.args
    x = int(args.get('x'))
    y = int(args.get('y'))
    mouse.position = (x, y)
    return [x, y]