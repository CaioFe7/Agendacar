from flask import Flask, request, jsonify, render_template
import sqlite3
from flask_cors import CORS
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "..", "frontend", "template"),
    static_folder=os.path.join(BASE_DIR, "..", "frontend", "static"),
)

CORS(app)


def conectar():
    return sqlite3.connect(os.path.join(BASE_DIR, "usuarios.db"))


# ======================= PÁGINAS =======================

@app.get("/")
def pagina_login():
    # http://127.0.0.1:5000/
    return render_template("Login.html")


@app.get("/cadastro")
def pagina_cadastro():
    # http://127.0.0.1:5000/cadastro
    return render_template("Cadastro.html")


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
        cursor.execute(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            (nome, email, senha),
        )
        conn.commit()
        return jsonify({"status": "ok", "msg": "Usuário cadastrado!"}), 201

    except Exception:
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

    cursor.execute(
        "SELECT * FROM usuarios WHERE email=? AND senha=?",
        (email, senha),
    )
    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({"status": "ok", "msg": "Login aprovado!"})
    else:
        return jsonify({"status": "erro", "msg": "Credenciais inválidas!"}), 401


if __name__ == "__main__":
    app.run(debug=True)
 