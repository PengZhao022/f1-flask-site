from flask import Flask, render_template

app = Flask(__name__)

dashboard_metadata = {
    "trend-line": {"title": "Trend Line", "description": "This dashboard shows the trend of race results over time using a Sankey-like visualization."},
    "across-tracks": {"title": "Across Tracks", "description": "Comparison of driver performance across different race tracks."},
    "car-evolution-rules": {"title": "Car Evolution / Rules", "description": "Effect of technical regulations and car design changes over the years."},
    "driver-1": {"title": "Driver 1", "description": "Performance insights for Driver 1 across seasons."},
    "driver-2": {"title": "Driver 2", "description": "Performance insights for Driver 2 across seasons."},
    "driver-3": {"title": "Driver 3", "description": "Performance insights for Driver 3 across seasons."},
    "qualifying-vs-final": {"title": "Qualifying vs Final Position", "description": "How qualifying position influences final race outcomes."},
    "grid-size-by-decade": {"title": "Grid Size by Decade", "description": "How the number of competitors on the grid has changed over decades."},
    "avg-final-by-qualifying": {"title": "Average Final Position by Qualifying", "description": "Trends in final positions based on qualifying rank."},
}

NAVBAR_HTML = """<nav>
    <ul style='display:flex; gap:20px; list-style:none; padding:10px; background:#222;'>
        <li><a href='/' style='color:white; text-decoration:none;'>Home</a></li>
        <li><a href='/about/about-f1' style='color:white; text-decoration:none;'>About F1</a></li>
        <li><a href='/dashboards/competition/trend-line' style='color:white; text-decoration:none;'>Competition</a></li>
        <li><a href='/dashboards/drivers/driver-1' style='color:white; text-decoration:none;'>Drivers</a></li>
        <li><a href='/dashboards/qualifying/qualifying-vs-final' style='color:white; text-decoration:none;'>Qualifying</a></li>
    </ul>
</nav>"""

@app.route('/')
def index():
    return render_template('index.html', navbar=NAVBAR_HTML)

@app.route('/dashboards/<section>/<page>')
def dashboards(section, page):
    meta = dashboard_metadata.get(page, {"title": page.replace("-", " ").title(), "description": ""})
    return render_template(f'dashboards/{section}/{page}.html',
                           title=meta["title"],
                           description=meta["description"],
                           navbar=NAVBAR_HTML)

if __name__ == '__main__':
    app.run(debug=True)
