document.addEventListener("DOMContentLoaded", function () {
     const form = document.querySelector("form"); // Seleciona o formulário
     const button = document.querySelector("#button-modal button"); // Botão de envio
     const modal = document.querySelector("#modal"); // Modal
     const close = document.querySelector("#close"); // Botão para fechar o modal
     const inputs = document.querySelectorAll("input[required], textarea[required], select[required]"); // Campos obrigatórios

     // Inicialmente, o botão deve estar desabilitado
     button.disabled = true;

     // Função para verificar a validade dos campos
     function validateField(input) {
          const parent = input.closest(".form-group, .form-group-row, .form-group-checkbox");
          let errorMessage = parent.querySelector(".error-message");

          // Remove a mensagem de erro existente antes de validar novamente
          if (errorMessage) {
               errorMessage.remove();
          }

          // Valida o preenchimento do campo
          if (!input.value.trim() || (input.type === "checkbox" && !input.checked)) {
               displayError(input, "Por favor, preencha este campo.");
               return false;
          }

          // Validação específica para e-mail
          if (input.type === "email" && !input.value.includes("@") ) {
               displayError(input, "O e-mail deve conter o caractere '@'.");
               return false;
          }

          input.classList.remove("error"); // Remove classe de erro se válido
          return true;
     }

     // Função para exibir mensagem de erro
     function displayError(input, message) {
          const parent = input.closest(".form-group, .form-group-row, .form-group-checkbox");
          const span = document.createElement("span");
          span.textContent = message;
          span.className = "error-message";
          parent.appendChild(span);
          input.classList.add("error");
     }

     // Função para verificar se o formulário está válido
     function validateForm() {
          let isValid = true;

          inputs.forEach((input) => {
               if (!validateField(input)) {
                    isValid = false;
               }
          });

          button.disabled = !isValid; // Habilita/desabilita o botão
     }

     // Adiciona eventos para validar os campos individualmente
     inputs.forEach((input) => {
          input.addEventListener("blur", function () {
               validateField(input); // Valida o campo ao sair dele
               validateForm(); // Atualiza a validação do formulário
          });

          input.addEventListener("input", validateForm); // Revalida ao digitar
          input.addEventListener("change", validateForm); // Revalida ao alterar (ex: checkbox)
     });

     // Evento de clique no botão "Enviar"
     button.addEventListener("click", function () {
          if (!button.disabled) {
               modal.showModal(); // Exibe o modal
          }
     });

     // Evento para fechar o modal
     close.addEventListener("click", function () {
          modal.close();
          form.reset();
          validateForm(); // Revalida o formulário após o reset
     });
});
