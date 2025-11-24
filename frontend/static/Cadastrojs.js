// === Mostrar / esconder senha ===
function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (!input || !el) return;

  const open = el.querySelector(".eye.open");
  const closed = el.querySelector(".eye.closed");
  const isPassword = input.type === "password";

  input.type = isPassword ? "text" : "password";

  if (open && closed) {
    open.style.display = isPassword ? "none" : "inline";
    closed.style.display = isPassword ? "inline" : "none";
  }
}

// === Validação básica de e-mail ===
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

  const dominio = email.split("@")[1]?.toLowerCase();
  return dominiosPermitidos.includes(dominio);
}

// === LÓGICA DO FORMULÁRIO ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const inputNome = document.getElementById("nome");
  const inputEmail = document.getElementById("email");
  const inputSenha = document.getElementById("senha");
  const inputConfirmar = document.getElementById("confirmar");
  const msg = document.getElementById("msg");
  const botao = document.querySelector(".btn");

  if (!form || !botao) {
    console.warn("Formulário ou botão não encontrados.");
    return;
  }

  if (msg) {
    msg.style.transition = "opacity 0.4s ease";
  }

  function resetBotao() {
    botao.disabled = false;
    botao.classList.remove("loading", "success");
    botao.style.cursor = "pointer";
    botao.textContent = "Criar conta";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value;
    const confirmar = inputConfirmar.value;

    if (msg) {
      msg.textContent = "";
      msg.style.opacity = "0";
    }

    // ----- desabilita + animação de carregamento -----
    botao.disabled = true;
    botao.classList.add("loading");
    botao.classList.remove("success");
    botao.style.cursor = "not-allowed";
    botao.textContent = "Processando...";

    // ================= VALIDAÇÕES =================
    if (!nome || !email || !senha || !confirmar) {
      if (msg) {
        msg.textContent = "Preencha todos os campos.";
        msg.style.color = "#dc3545";
        msg.style.opacity = "1";
      }
      resetBotao();
      return;
    }

    if (!emailValido(email)) {
      if (msg) {
        msg.textContent = "Digite um e-mail válido.";
        msg.style.color = "#dc3545";
        msg.style.opacity = "1";
      }
      resetBotao();
      return;
    }

    if (senha.length < 8) {
      if (msg) {
        msg.textContent = "A senha deve ter pelo menos 8 caracteres.";
        msg.style.color = "#dc3545";
        msg.style.opacity = "1";
      }
      resetBotao();
      return;
    }

    if (senha !== confirmar) {
      if (msg) {
        msg.textContent = "As senhas não coincidem.";
        msg.style.color = "#dc3545";
        msg.style.opacity = "1";
      }
      resetBotao();
      return;
    }

    // =============== CHAMADA AO BACKEND ===============
    try {
      // Use o endereço COMPLETO do Flask (porta 5000)
      const resp = await fetch("http://127.0.0.1:5000/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      let data = {};
      try {
        data = await resp.json();
      } catch (e) {
        // se backend não mandar JSON, ignora
      }

      if (!resp.ok || data.status === "erro") {
        const erroMsg = data.msg || "Erro ao cadastrar. Tente novamente.";
        if (msg) {
          msg.textContent = erroMsg;
          msg.style.color = "#dc3545";
          msg.style.opacity = "1";
        }
        resetBotao();
        return;
      }

      // ====== SUCESSO ======
      if (msg) {
        msg.textContent = "Sucesso";
        msg.style.color = "green";
        msg.style.opacity = "1";
      }

      botao.classList.remove("loading");
      botao.classList.add("success");
      botao.textContent = "✔";

      // espera um pouco e volta pra tela de login
      setTimeout(() => {
        // ===============================================
        // AQUI ESTÁ A CORREÇÃO PARA O LIVE SERVER:
        // Manda buscar o arquivo Login.html na mesma pasta
        // ===============================================
        window.location.href = "Login.html";
      }, 1000);
    } catch (erro) {
      console.error("Erro no fetch /cadastrar:", erro);
      if (msg) {
        msg.textContent = "Erro ao conectar com o servidor.";
        msg.style.color = "#dc3545";
        msg.style.opacity = "1";
      }
      resetBotao();
    }
  });
});
