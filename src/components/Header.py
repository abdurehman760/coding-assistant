class Header:
    def __init__(self):
        self.navigation_links = [
            {'name': 'Home', 'url': '#home'},
            {'name': 'About', 'url': '#about'},
            {'name': 'Contact', 'url': '#contact'},
        ]

    def render(self):
        header_html = '<header>'
        header_html += '<h1>Header Component</h1>'
        header_html += '<nav>'
        header_html += '<ul>'
        for link in self.navigation_links:
            header_html += f'<li><a href="{link["url"]}">{link["name"]}</a></li>'
        header_html += '</ul>'
        header_html += '</nav>'
        header_html += '</header>'
        return header_html