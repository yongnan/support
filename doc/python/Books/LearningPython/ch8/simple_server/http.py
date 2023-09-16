import BaseHTTPServer

def run(server_class=BaseHTTPServer.HTTPServer,
        handler_class=BaseHTTPServer.BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

# start a simple HTTP Server
#python -m http.server 8000  #python3
#python -m BaseHTTPServer 8000  #python2
run()
