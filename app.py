
from flask import Flask, render_template
app = Flask(__name__)

def get_sidebar():
    return '''
<span class="collapsible">About</span>
<ul class="content">
  <li><a href="/about/about-f1">About F1</a></li>
  <li><a href="/about/purpose">Purpose</a></li>
  <li><a href="/about/team">Team Members</a></li>
</ul>
<span class="collapsible">Dashboards</span>
<ul class="content">
  <li>
    <span class="collapsible">Competition</span>
    <ul class="content">
      <li><a href="/dashboards/competition/trend-line">Trend Line</a></li>
      <li><a href="/dashboards/competition/across-tracks">Across Tracks</a></li>
      <li><a href="/dashboards/competition/car-evolution-rules">Car Evolution / Rules</a></li>
    </ul>
  </li>
  <li>
    <span class="collapsible">Qualifying</span>
    <ul class="content">
      <li><a href="/dashboards/qualifying/qualifying-vs-final">Qualifying vs Final</a></li>
      <li><a href="/dashboards/qualifying/grid-size-by-decade">Grid Size by Decade</a></li>
      <li><a href="/dashboards/qualifying/avg-final-by-qualifying">Avg Final by Qualifying</a></li>
    </ul>
  </li>
</ul>
<span class="collapsible">Resources</span>
<ul class="content">
  <li><a href="/resources/documentation">Documentation</a></li>
  <li><a href="/resources/github-link">GitHub Link</a></li>
</ul>
'''

@app.route("/")
def index():
    return render_template("index.html", sidebar=get_sidebar())

@app.route("/<section>/<page>")
@app.route("/<section>/<sub>/<page>")
def render_page(section, sub=None, page=None):
    path = f"{section}/{sub}/{page}" if sub else f"{section}/{page}"
    return render_template("page.html", title=page.replace('-', ' ').title(), sidebar=get_sidebar(), description="Text test")
