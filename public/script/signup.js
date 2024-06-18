document
  .getElementById("signup")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitError = document.getElementById("submit-error");

    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[1-9]\d{9}$/;
    const passwordRegex = /^.{8,}$/;

    let validated = true;
    if (!nameRegex.test(name)) {
      submitError.innerHTML = "Please enter a valid name(A-Z)";
      validated = false;
    } else if (!emailRegex.test(email)) {
      submitError.innerHTML = "Please enter a valid email";
    } else if (!passwordRegex.test(password)) {
      submitError.innerHTML = "Please enter a valid password";
    } else if (!phoneRegex.test(phone)) {
      submitError.innerHTML = "Please enter a valid phone numbr";
    } else {
      submitError.innerHTML = "";
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
        }),
      });

      if (response.ok) {
       window.location.href = '/login'
      } else {
        const data = await response.json();
        alert(data.message);
      }
    }
  });
