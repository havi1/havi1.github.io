// API URL
const apiUrl = 'http://localhost:3000/api/users';

// Sprawdzanie stanu zalogowania (można przechowywać w Local Storage)
const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

// Logowanie
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tutaj można dodać logikę walidacji użytkownika
    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Nieprawidłowa nazwa użytkownika lub hasło.');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(data.user)); // Przechowywanie danych użytkownika
        showDashboard();
    })
    .catch(error => {
        alert(error.message);
    });
};

// Wylogowywanie
const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    showLoginPage();
};

// Pokaż ekran logowania
const showLoginPage = () => {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
};

// Pokaż ekran rejestracji
const showRegisterPage = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
};

// Pokaż główny dashboard
const showDashboard = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'none';
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

// Funkcja rejestracji użytkownika
const createUser = async (username, password) => {
    try {
        const response = await fetch(`${apiUrl}/register`, {
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
        alert('Rejestracja zakończona sukcesem!');
        showLoginPage(); // Po rejestracji przekierowanie do logowania
    } catch (error) {
        alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
        console.error('Błąd:', error);
    }
};

// Wywołanie funkcji createUser() po kliknięciu przycisku "Zarejestruj"
document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    createUser(username, password);
});

// Wywołanie logowania po kliknięciu przycisku "Zaloguj"
document.getElementById('loginButton').addEventListener('click', login);

// Przełączanie na formularz rejestracji
document.getElementById('showRegisterForm').addEventListener('click', showRegisterPage);

// Przełączanie na formularz logowania
document.getElementById('showLoginForm').addEventListener('click', showLoginPage);
