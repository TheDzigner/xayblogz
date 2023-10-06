


const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').
value;
    const registerConfirmPassword = document.getElementById
('registerConfirmPassword').value;
    const registerUsername = document.getElementById('registerUsername').
value;
    if (registerPassword!== registerConfirmPassword) {
        alert('Passwords do not match');
        return;
    }
})
