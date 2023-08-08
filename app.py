from flask import Flask, render_template, abort
from screeninfo import get_monitors
from PIL import ImageGrab
import base64
from io import BytesIO

app = Flask(__name__)
monitors = get_monitors()

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/monitors")
def monitor():
    return monitors

@app.route("/screenshot/<int:monitor_id>")
def screenshot(monitor_id=0):
    if(monitor_id < len(monitors)):
        monitor = monitors[monitor_id]
        ss_region = (monitor.x, monitor.y, monitor.width+monitor.x, monitor.height+monitor.y)
        ss_img = ImageGrab.grab(ss_region)
        
        buffered = BytesIO()
        ss_img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue())
        img_base64 = bytes("data:image/jpeg;base64,", encoding='utf-8') + img_str
        return { "screenshot": img_base64.decode("utf-8")}
    else:
        abort(404)
