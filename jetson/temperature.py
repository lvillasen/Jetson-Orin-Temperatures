#!/usr/bin/env python3
import http.client
import urllib.parse
import ssl
from datetime import datetime
import os
import re

def obtener_temperaturas():
    try:
        output = os.popen("tegrastats | head -n 1").read().strip()
        # Buscar los campos de temperatura con regex
        matches = re.findall(r'(CPU|Tboard|SOC2|Tdiode|SOC0|GPU|tj|SOC1)@([-+]?[0-9]*\.?[0-9]*)C', output)
        temps = {label: float(valor) for label, valor in matches if valor != '-256'}
        print("Temps: ",temps)
        return temps
    except Exception as e:
        print("Error al obtener temperaturas:", e)
        return {}

def enviar_temperaturas():
    temps = obtener_temperaturas()
    if not temps:
        return

    now = datetime.now()
    formatted_time = now.strftime("%Y-%m-%d %H:%M:%S")

    data = {
        'date_time': formatted_time
    }
    data.update(temps)

    params = urllib.parse.urlencode(data)
    headers = { "Content-type": "application/x-www-form-urlencoded" }

    ssl_context = ssl._create_unverified_context()

    try:
        conn = http.client.HTTPSConnection("your-web-server-IP", context=ssl_context)
        conn.request("POST", "/jetson/save_temps.php", params, headers)
        response = conn.getresponse()
        if response.status == 200:
            print("Datos enviados:", data)
            print(response.read().decode())
        else:
            print("Error al enviar datos:", response.status)
        conn.close()
    except Exception as e:
        print("Ocurrió un error:", e)

if __name__ == "__main__":
    enviar_temperaturas()
