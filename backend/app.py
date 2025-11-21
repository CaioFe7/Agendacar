from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permitir frontend acessar backend

def conectar():
    return sqlite3.connect("usuarios.db")

# ======================= CADASTRAR =======================
@app.post("/cadastrar")
def cadastrar():
    dados = request.json
    nome = dados["nome"]
    email = dados["email"]
    senha = dados["senha"]

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
                       (nome, email, senha))
        conn.commit()
        return jsonify({"status": "ok", "msg": "Usuário cadastrado!"}), 201

    except Exception as e:
        return jsonify({"status": "erro", "msg": "Email já existe!"}), 400

    finally:
        conn.close()

# ========================= LOGIN =========================
@app.post("/login")
def login():
    dados = request.json
    email = dados["email"]
    senha = dados["senha"]

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE email=? AND senha=?", (email, senha))
    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({"status": "ok", "msg": "Login aprovado!"})
    else:
        return jsonify({"status": "erro", "msg": "Credenciais inválidas!"}), 401


if __name__ == "__main__":
    app.run(debug=True)
