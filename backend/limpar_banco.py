import sqlite3

conexao = sqlite3.connect('usuarios.db')
cursor = conexao.cursor()

# Tenta limpar a tabela
try:
    cursor.execute("DELETE FROM usuarios") 
    conexao.commit()
    print("✅ Tabela limpa!")
except Exception as e:
    print(f"Erro: {e}")

conexao.close()