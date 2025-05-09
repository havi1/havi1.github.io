// Sprawdzanie stanu zalogowania (można przechowywać w Local Storage)
const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

// Logowanie
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tutaj można dodać logikę walidacji użytkownika
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        showDashboard();
    } else {
        alert('Nieprawidłowa nazwa użytkownika lub hasło.');
    }
};

// Wylogowywanie
const logout = () => {
    localStorage.removeItem('loggedIn');
    showLoginPage();
};

// Pokaż ekran logowania
const showLoginPage = () => {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
};

// Pokaż główny dashboard
const showDashboard = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
};

// Sprawdź stan zalogowania przy załadowaniu strony
window.onload = () => {
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLoginPage();
    }
};

// API URL
const apiUrl = 'http://localhost:3000/api/users';

// Funkcja tworzenia użytkownika
const createUser = async (username, password) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data.message); // Komunikat z serwera
        alert('Rejestracja zakończona sukcesem!');
        showLoginPage(); // Po rejestracji przekierowanie do logowania
    } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error);
        alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
    }
};

// Wywołanie funkcji createUser() po kliknięciu przycisku "Zarejestruj"
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    createUser(username, password);
});

// Wywołanie logowania po kliknięciu przycisku "Zaloguj"
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', login);
