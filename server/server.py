# server.py
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
from youtube2mp4 import youtube2mp4

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/download', methods=['GET', 'POST'])
def download():
   if request.method == 'POST':
        print "Got request!"
        urlfromjs = request.form['url']
        print urlfromjs

        try:
            video_name = youtube2mp4(urlfromjs)
            video_name += ".mp4"
        except Exception, e:
            if str(e) == 'HTTP Error 403: Forbidden':
                video_name = "forbidden"
            else:
                video_name = 'failed'

        resp = make_response(url_for('static', filename='downloaded_videos/' + video_name) + ";" + video_name)
        resp.headers['Content-Type'] = "application/text"
        return resp
        
if __name__ == "__main__":
    app.run()