
from flask import Flask, render_template

app = Flask(__name__)

SIDEBAR_HTML = '''
<div class="sidebar">
  <div class="sidebar-section">
    <h2 class="collapsible">About</h2>
    <ul class="content">
      <li><a href="/about/about-f1">About F1</a></li>
      <li><a href="/about/purpose">Purpose</a></li>
      <li><a href="/about/team-members">Team Members</a></li>
    </ul>
  </div>

  <div class="sidebar-section">
    <h2 class="collapsible">Dashboards</h2>
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
        <span class="collapsible">Drivers</span>
        <ul class="content">
          <li><a href="/dashboards/drivers/driver-1">Driver 1</a></li>
          <li><a href="/dashboards/drivers/driver-2">Driver 2</a></li>
          <li><a href="/dashboards/drivers/driver-3">Driver 3</a></li>
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
  </div>

  <div class="sidebar-section">
    <h2 class="collapsible">Resources</h2>
    <ul class="content">
      <li><a href="/resources/documentation">Documentation</a></li>
      <li><a href="/resources/github-link">GitHub Link</a></li>
    </ul>
  </div>
</div>

<script>
document.querySelectorAll('.collapsible').forEach(function(header) {
  header.addEventListener('click', function() {
    var next = this.nextElementSibling;
    if (next && next.classList.contains('content')) {
      next.style.display = next.style.display === 'block' ? 'none' : 'block';
    }
  });
});
</script>
'''

@app.route('/')
def index():
    return render_template('index.html', sidebar=SIDEBAR_HTML)

@app.route('/<section>/<page>')
def level2(section, page):
    return render_template(f'{section}/{page}.html',
                           title=page.replace('-', ' ').title(),
                           description='',
                           sidebar=SIDEBAR_HTML)

@app.route('/dashboards/<sub>/<page>')
def level3(sub, page):
    return render_template(f'dashboards/{sub}/{page}.html',
                           title=page.replace('-', ' ').title(),
                           description='',
                           sidebar=SIDEBAR_HTML)

if __name__ == '__main__':
    app.run(debug=True)
