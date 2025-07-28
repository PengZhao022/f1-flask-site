

icon_map = {
    "overview": ("Overview", "fa-gauge-high"),
    "drivers": ("Track", "fa-car"),
    "constructors": ("Constructors", "fa-industry"),
    "tracks": ("Tracks", "fa-road"),
    "results": ("Race Results", "fa-flag-checkered"),
    "championships": ("Championships", "fa-trophy"),
    "about": ("About", "fa-book"),
    "resources": ("Resources", "fa-folder-open"),
    "links": ("External Links", "fa-external-link-alt"),
    "data": ("Data Sources", "fa-database")
}


from flask import Flask, render_template
import json

app = Flask(__name__)

with open("menu_config.json") as f:
    MENU_CONFIG = json.load(f)

def generate_sidebar():
    html = ""
    for section, items in MENU_CONFIG.items():
        html += f'<span class="collapsible">{section}</span><ul class="content">'
        for label, content in items.items():
            if isinstance(content, dict) and "path" in content:
                html += f'<li><a href="{content["path"]}">{label}</a></li>'
            elif isinstance(content, dict):
                html += f'<li><span class="collapsible">{label}</span><ul class="content">'
                for sublabel, subcontent in content.items():
                    if isinstance(subcontent, dict) and "path" in subcontent:
                        html += f'<li><a href="{subcontent["path"]}">{sublabel}</a></li>'
                    elif isinstance(subcontent, dict):
                        html += f'<li><span class="collapsible">{sublabel}</span><ul class="content">'
                        for sub_sublabel, sub_subcontent in subcontent.items():
                            if isinstance(sub_subcontent, dict) and "path" in sub_subcontent:
                                html += f'<li><a href="{sub_subcontent["path"]}">{sub_sublabel}</a></li>'
                        html += "</ul></li>"
                html += "</ul></li>"
        html += "</ul>"
    return html

def find_content(path):
    for section in MENU_CONFIG.values():
        for label, content in section.items():
            if isinstance(content, dict) and "path" in content:
                if content["path"] == path:
                    return content
            elif isinstance(content, dict):
                for subcontent in content.values():
                    if subcontent["path"] == path:
                        return subcontent
    return {"description": "Not found", "tableau": ""}

@app.route("/")
def index():
    return render_template("index.html", sidebar=generate_sidebar())

@app.route("/<section>/<page>")
@app.route("/<section>/<sub>/<page>")
def render_page(section, sub=None, page=None):
    path = f"/{section}/{sub}/{page}" if sub else f"/{section}/{page}"
    content = find_content(path)
    return render_template("page.html", title=page.replace('-', ' ').title(), sidebar=generate_sidebar(), description=content["description"], tableau=content["tableau"])


@app.route('/page/<path:page_path>')
def dynamic_page(page_path):
    parts = page_path.strip('/').split('/')
    section = parts[0].lower()
    page_title, icon_class = icon_map.get(section, ("Untitled", "fa-file"))
    template_file = f"content/{page_path}.html"
    return render_template("page.html", page_title=page_title, icon_class=icon_class, path=page_path, content_template=template_file)


if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
