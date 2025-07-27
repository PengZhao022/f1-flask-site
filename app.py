
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("Homepage/index.html")

@app.route("/about-f1")
def about_f1():
    return render_template("Homepage/about-f1.html")

@app.route("/purpose")
def purpose():
    return render_template("Homepage/purpose.html")

@app.route("/team-members")
def team_members():
    return render_template("Homepage/team-members.html")

@app.route("/dashboards/driver/radar")
def driver_radar():
    return render_template("dashboards/driver-career-performance/radar-plot.html")

@app.route("/dashboards/driver/race-finish")
def driver_race_finish():
    return render_template("dashboards/driver-career-performance/race-number-vs-finish-position.html")

@app.route("/dashboards/track/grid")
def track_grid():
    return render_template("dashboards/track/grid-view-toggle-nonwins.html")

@app.route("/dashboards/track/competitiveness")
def track_competitiveness():
    return render_template("dashboards/track/track-competitiveness-tab.html")

@app.route("/dashboards/constructor/usability")
def constructor_usability():
    return render_template("dashboards/constructor/usability-study-update.html")

@app.route("/dashboards/extras/global")
def extras_global():
    return render_template("dashboards/analytics-extras/global-map.html")

@app.route("/dashboards/extras/winning")
def extras_winning():
    return render_template("dashboards/analytics-extras/tracks/winningest-driver.html")

@app.route("/resources/github")
def resources_github():
    return render_template("resources/github.html")

@app.route("/resources/source-data")
def resources_data():
    return render_template("resources/source-data.html")

@app.route("/resources/citations")
def resources_citations():
    return render_template("resources/citations.html")
