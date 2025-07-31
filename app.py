from flask import Flask, render_template
app = Flask(__name__)

# Home
@app.route('/')
def home():
    return render_template('home.html')

# About
@app.route('/about/f1')
def about_f1():
    return render_template('about/f1.html')

@app.route('/about/purpose')
def purpose():
    return render_template('about/purpose.html')

@app.route('/about/team')
def team():
    return render_template('about/team.html')

# Dashboards
@app.route('/dashboards/radar')
def radar_plot():
    return render_template('dashboards/radar_plot.html')

@app.route('/dashboards/race')
def race_number():
    return render_template('dashboards/race_number_vs_finish_position.html')

@app.route('/dashboards/track1')
def track1():
    return render_template('dashboards/track1.html')

@app.route('/dashboards/track2')
def track2():
    return render_template('dashboards/track2.html')

@app.route('/dashboards/c1')
def c1():
    return render_template('dashboards/c1.html')

@app.route('/dashboards/c2')
def c2():
    return render_template('dashboards/c2.html')

@app.route('/dashboards/global')
def global_map():
    return render_template('dashboards/global_map.html')

# Resources
@app.route('/resources/data')
def data():
    return render_template('resources/data.html')

@app.route('/resources/github')
def github():
    return render_template('resources/github.html')

@app.route('/resources/references')
def references():
    return render_template('resources/references.html')

if __name__ == '__main__':
    app.run(debug=True)
