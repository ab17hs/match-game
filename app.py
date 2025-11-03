from flask import Flask, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # disable caching

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
