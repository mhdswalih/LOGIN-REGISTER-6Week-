document
  .getElementById("adminlog")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitError = document.getElementById("submit-error")
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!emailRegex.test(email)) {
      submitError.innerHTML = "Invalid email";
    } else if (!passwordRegex.test(password)) {
      submitError.innerHTML = " Invalid Password";
    } else {
      submitError.innerHTML = "";
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        const data = await response.json();
        submitError.innerHTML = data.message;
      }
    }
  });
