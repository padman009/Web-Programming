#!/usr/bin/env python3
"""Раздаёт по локальной сети только index.html игры (больше ничего из папки не отдаётся).

    python3 p2p-pingpong/serve.py [порт]      # по умолчанию 8000

Файл читается при каждом запросе: после `git pull` перезапускать сервер не нужно.
"""
import http.server
import os
import socket
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
INDEX = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html')


class Handler(http.server.BaseHTTPRequestHandler):
    def _send(self, head_only):
        if self.path.split('?')[0] not in ('/', '/index.html'):
            self.send_error(404)
            return
        with open(INDEX, 'rb') as f:
            body = f.read()
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        if not head_only:
            self.wfile.write(body)

    def do_GET(self):
        self._send(False)

    def do_HEAD(self):
        self._send(True)


def lan_ips():
    """IPv4 адреса этого компьютера в локальной сети (без выхода в интернет)."""
    ips = []
    for probe in ('192.168.0.1', '192.168.1.1', '10.0.0.1', '172.16.0.1'):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect((probe, 1))   # пакет не отправляется, просто выбирается интерфейс
            ip = s.getsockname()[0]
            s.close()
            if not ip.startswith('127.') and ip not in ips:
                ips.append(ip)
        except OSError:
            pass
    return ips


if __name__ == '__main__':
    try:
        server = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    except OSError as e:
        sys.exit(f'Не удалось занять порт {PORT} ({e.strerror}). Попробуйте другой: python3 {sys.argv[0]} 8080')
    print(f'Раздаю {INDEX}\n')
    print(f'  Ноутбук (камера работает, это localhost):  http://localhost:{PORT}/')
    for ip in lan_ips():
        print(f'  Телефон (та же Wi-Fi):                    http://{ip}:{PORT}/')
    print('\nПо http:// на телефоне браузер не даёт камеру: используйте режимы «Фото» и «Код».')
    print('Не открывается с телефона? Проверьте файрвол: sudo ufw allow %d/tcp' % PORT)
    print('Остановить: Ctrl+C\n')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nОстановлено.')
