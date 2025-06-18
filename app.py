from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about/<page>')
def about(page):
    return render_template(f'about/{page}.html')

@app.route('/dashboards/competition/<page>')
def dashboards_competition(page):
    return render_template(f'dashboards/competition/{page}.html')

@app.route('/dashboards/drivers/<page>')
def dashboards_drivers(page):
    return render_template(f'dashboards/drivers/{page}.html')

@app.route('/dashboards/qualifying/<page>')
def dashboards_qualifying(page):
    return render_template(f'dashboards/qualifying/{page}.html')

@app.route('/resources/<page>')
def resources(page):
    return render_template(f'resources/{page}.html')

if __name__ == '__main__':
    app.run(debug=True)
