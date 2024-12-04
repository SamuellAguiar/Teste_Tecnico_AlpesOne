document.addEventListener("DOMContentLoaded", function () {
     const form = document.querySelector("form"); 
     const button = document.querySelector("#button-modal button");
     const modal = document.querySelector("#modal");
     const close = document.querySelector("#close");
     const inputs = document.querySelectorAll("input[required], textarea[required], select[required]");
     const menuToggle = document.querySelector(".menu-toggle");
     const navOverlay = document.querySelector(".nav-overlay");
     const closeMenuButton = document.querySelector(".close-overlay");

     button.disabled = true;

     function validateField(input) {
          const parent = input.closest(".form-group, .form-group-row, .form-group-checkbox");
          let errorMessage = parent.querySelector(".error-message");

          if (errorMessage) {
               errorMessage.remove();
          }

          if (!input.value.trim() || (input.type === "checkbox" && !input.checked)) {
               displayError(input, "Por favor, preencha este campo.");
               return false;
          }

          if (input.type === "email" && !input.value.includes("@")) {
               displayError(input, "O e-mail deve conter o caractere '@'.");
               return false;
          }

          input.classList.remove("error");
          return true;
     }

     function displayError(input, message) {
          const parent = input.closest(".form-group, .form-group-row, .form-group-checkbox");
          const span = document.createElement("span");
          span.textContent = message;
          span.className = "error-message";
          parent.appendChild(span);
          input.classList.add("error");
     }

     function validateForm() {
          let isValid = true;

          inputs.forEach((input) => {
               if (!validateField(input)) {
                    isValid = false;
               }
          });

          button.disabled = !isValid;
     }

     inputs.forEach((input) => {
          input.addEventListener("blur", function () {
               validateField(input);
               validateForm();
          });

          input.addEventListener("input", validateForm);
          input.addEventListener("change", validateForm);
     });

     button.addEventListener("click", function () {
          if (!button.disabled) {
               modal.showModal();
          }
     });

     close.addEventListener("click", function () {
          modal.close();
          form.reset();
          validateForm();
     });

     menuToggle.addEventListener("click", () => {
          navOverlay.classList.add("active");
     });

     closeMenuButton.addEventListener("click", () => {
          navOverlay.classList.remove("active");
     });
});
