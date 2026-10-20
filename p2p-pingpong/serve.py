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


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):   # всё, кроме главной страницы, указывает на несуществующий файл -> 404
        return INDEX if path.split('?')[0] in ('/', '/index.html') else INDEX + '.missing'

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


def lan_ips():
    """IPv4 адреса этого компьютера в локальной сети (без выхода в интернет)."""
    ips = []
    for probe in ('192.168.0.1', '192.168.1.1', '10.0.0.1', '172.16.0.1'):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.connect((probe, 1))   # пакет не отправляется, просто выбирается интерфейс
                ip = s.getsockname()[0]
        except OSError:
            continue
        if not ip.startswith('127.') and ip not in ips:
            ips.append(ip)
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
    print(f'Не открывается с телефона? Проверьте файрвол: sudo ufw allow {PORT}/tcp')
    print('Остановить: Ctrl+C\n')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nОстановлено.')
