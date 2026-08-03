from flask import Flask, render_template
import random

app = Flask(__name__)

# Convertidor de números a letras en español (0 - 999)
def numero_a_letras(n):
    unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"]
    especiales = {
        10: "diez", 11: "once", 12: "doce", 13: "trece", 14: "catorce", 15: "quince",
        16: "dieciséis", 17: "diecisiete", 18: "dieciocho", 19: "diecinueve",
        20: "veinte", 21: "veintiuno", 22: "veintidós", 23: "veintitrés", 24: "veinticuatro",
        25: "veinticinco", 26: "veintiséis", 27: "veintisiete", 28: "veintiocho", 29: "veintinueve"
    }
    decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"]
    centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", 
                "seiscientos", "setecientos", "ochocientos", "novecienctos"]

    if n == 0:
        return "cero"
    if n == 100:
        return "cien"
    
    texto = ""
    
    # Centenas
    c = n // 100
    resto_c = n % 100
    if c > 0:
        texto += centenas[c]
    
    # Decenas y Unidades
    if resto_c > 0:
        if texto != "":
            texto += " "
        if resto_c in especiales:
            texto += especiales[resto_c]
        else:
            d = resto_c // 10
            u = resto_c % 10
            if d > 0:
                texto += decenas[d]
                if u > 0:
                    texto += " y " + unidades[u]
            else:
                texto += unidades[u]
                
    return texto.strip()

@app.route('/')
def juego():
    # Tipo de operación al azar (suma o resta)
    tipo_op = random.choice(['suma', 'resta'])
    
    if tipo_op == 'suma':
        c1, c2 = random.randint(1, 4), random.randint(1, 4)
        d1 = random.randint(1, 4)
        d2 = random.randint(1, 9 - d1)
        u1 = random.randint(1, 4)
        u2 = random.randint(1, 9 - u1)
        
        num1 = (c1 * 100) + (d1 * 10) + u1
        num2 = (c2 * 100) + (d2 * 10) + u2
        resultado = num1 + num2
    else: # resta sin pedir prestado
        c1 = random.randint(2, 8)
        c2 = random.randint(1, c1 - 1)
        d1 = random.randint(2, 9)
        d2 = random.randint(1, d1)
        u1 = random.randint(2, 9)
        u2 = random.randint(1, u1)
        
        num1 = (c1 * 100) + (d1 * 10) + u1
        num2 = (c2 * 100) + (d2 * 10) + u2
        resultado = num1 - num2

    resultado_letras = numero_a_letras(resultado)

    return render_template('index.html', 
                           num1=num1, 
                           num2=num2, 
                           tipo_op=tipo_op,
                           resultado_letras=resultado_letras)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Puerto 5001 para no pisar el anterior
