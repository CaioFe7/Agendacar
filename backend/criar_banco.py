import sqlite3
import os

# Garante que vai criar no mesmo lugar que o app.py procura
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
caminho_banco = os.path.join(BASE_DIR, "usuarios.db")

conexao = sqlite3.connect(caminho_banco)
cursor = conexao.cursor()

# Cria a tabela novamente
cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
)
""")

conexao.commit()
print(f"✅ Tabela 'usuarios' criada com sucesso em: {caminho_banco}")
conexao.close()