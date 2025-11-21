import sqlite3

conn = sqlite3.connect("usuarios.db")
cursor = conn.cursor()

cursor.execute("SELECT id, nome, email, senha FROM usuarios")
usuarios = cursor.fetchall()

if not usuarios:
    print("Nenhum usuário cadastrado.")
else:
    for u in usuarios:
        print(f"ID: {u[0]} | Nome: {u[1]} | Email: {u[2]} | Senha: {u[3]}")

conn.close()
