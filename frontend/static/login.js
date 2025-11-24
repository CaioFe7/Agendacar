// ===== OLHINHO DA SENHA =====
function togglePassword(id, el) {
  const input = document.getElementById(id);
  const open = el.querySelector(".eye.open");
  const closed = el.querySelector(".eye.closed");

  if (!input || !open || !closed) return;

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  open.style.display = isPassword ? "none" : "inline";
  closed.style.display = isPassword ? "inline" : "none";
}

// ===== LOGIN =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const inputEmail = document.getElementById("email");
  const inputSenha = document.getElementById("senha");
  const msg = document.getElementById("loginMsg");
  const botao = form ? form.querySelector(".btn") : null;

  if (!form || !botao || !inputEmail || !inputSenha || !msg) return;

  // só pra ficar mais suave
  msg.style.transition = "opacity 0.3s ease";

  function resetBotao() {
    botao.disabled = false;
    botao.style.opacity = "1";
    botao.style.cursor = "pointer";
    botao.textContent = "Entrar";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = inputEmail.value.trim();
    const senha = inputSenha.value;

    msg.textContent = "";
    msg.style.opacity = "0";

    if (!email || !senha) {
      msg.textContent = "Preencha email e senha.";
      msg.style.color = "#dc3545";
      msg.style.opacity = "1";
      return;
    }

    botao.disabled = true;
    botao.style.opacity = "0.7";
    botao.style.cursor = "not-allowed";
    botao.textContent = "Entrando...";

    try {
      const resp = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resp.json().catch(() => ({}));

      if (resp.ok && data.status === "ok") {
        msg.textContent = "Sucesso";
        msg.style.color = "green";
        msg.style.opacity = "1";

        // redireciona pra tela de aluguel (mesma pasta do Login.html)
        setTimeout(() => {
          window.location.href = "aluguel.html";
        }, 800);
      } else {
        msg.textContent = data.msg || "Email ou senha inválidos.";
        msg.style.color = "#dc3545";
        msg.style.opacity = "1";
        resetBotao();
      }
    } catch (e) {
      console.error(e);
      msg.textContent = "Erro ao conectar com o servidor.";
      msg.style.color = "#dc3545";
      msg.style.opacity = "1";
      resetBotao();
    }
  });
});
