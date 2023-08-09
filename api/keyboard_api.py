from flask import Blueprint, request
from pynput.keyboard import Key, Controller as KeyboardController

keyboard_api = Blueprint('keyboard', __name__, url_prefix='/keyboard')

keyboard=KeyboardController()

@keyboard_api.route("/keypress")
def keypress():
    args = request.args
    key = int(args.get('key'))

    keyboard.type(chr(key))
    return {'type': key}

@keyboard_api.route("/keyup")
def keyup():
    args = request.args
    key = int(args.get('key'))
    
    if key == 8:
        keyboard.press(Key.backspace)
        keyboard.release(Key.backspace)
    
    if key == 46:
        keyboard.press(Key.delete)
        keyboard.release(Key.delete)

    return {'type': key}