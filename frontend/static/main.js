function togglePassword(id, el) {
  const input = document.getElementById(id);
  const open = el.querySelector(".eye.open");
  const closed = el.querySelector(".eye.closed");
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  open.style.display = isPassword ? "none" : "inline";
  closed.style.display = isPassword ? "inline" : "none";
}

function emailValido(email) {
  const regexBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexBasico.test(email)) return false;

  const dominiosPermitidos = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "live.com",
    "icloud.com",
  ];

  const dominio = email.split("@")[1].toLowerCase();
  return dominiosPermitidos.includes(dominio);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const inputNome = document.getElementById("nome");
  const inputEmail = document.getElementById("email");
  const inputSenha = document.getElementById("senha");
  const inputConfirmar = document.getElementById("confirmar");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value;
    const confirmar = inputConfirmar.value;

    msg.textContent = "";

    if (!nome || !email || !senha || !confirmar) {
      msg.textContent = "Preencha todos os campos.";
      msg.style.color = "#dc3545";
      return;
    }

    if (!emailValido(email)) {
      msg.textContent =
        "Digite um e-mail válido (@gmail.com, @hotmail.com, @outlook.com, etc).";
      msg.style.color = "#dc3545";
      return;
    }

    if (senha.length < 8) {
      msg.textContent = "A senha deve ter pelo menos 8 caracteres.";
      msg.style.color = "#dc3545";
      return;
    }

    if (senha !== confirmar) {
      msg.textContent = "Erro: As senhas não coincidem!";
      msg.style.color = "#dc3545";
      return;
    }

    try {
      const resp = await fetch("http://127.0.0.1:5000/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await resp.json();

      if (resp.ok && data.status === "ok") {
        msg.textContent = data.msg || "Sucesso! Usuário cadastrado.";
        msg.style.color = "var(--blue-500)";
        form.reset();
      } else {
        msg.textContent = data.msg || "Erro ao cadastrar usuário.";
        msg.style.color = "#dc3545";
      }
    } catch (erro) {
      msg.textContent = "Não foi possível conectar ao servidor.";
      msg.style.color = "#dc3545";
    }
  });
});
