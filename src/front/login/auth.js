// auth.js (com Firebase v9+)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDQKSxkPuq0LTTkg1W0Q-RVsmb6dBAsrYM",
    authDomain: "sensorfix-login.firebaseapp.com",
    projectId: "sensorfix-login",
    storageBucket: "sensorfix-login.appspot.com",
    messagingSenderId: "399937964738",
    appId: "1:399937964738:web:c950b586417e3a1bb4095b",
    measurementId: "G-DBJPRSS4SR"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Auth
const auth = getAuth(app);

// Função de cadastro
function cadastrar(event) {
    event.preventDefault();

    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const senhaRepetida = document.getElementById('senhaRepeteCadastro').value;

    if (senha !== senhaRepetida) {
        alert("As senhas não coincidem.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then(userCredential => {
            alert('Usuário cadastrado com sucesso!');
            // Redirecionar ou limpar campos, se desejar
        })
        .catch(error => {
            alert('Erro ao cadastrar: ' + error.message);
        });
}

// Função de login
function login() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(userCredential => {
            alert('Login realizado com sucesso!');
        })
        .catch(error => {
            alert('Erro ao logar: ' + error.message);
        });
}

// Função de logout
function logout() {
    signOut(auth).then(() => {
        alert('Logout realizado com sucesso!');
    });
}

// Verifica se usuário está logado
onAuthStateChanged(auth, user => {
    const icon = document.getElementById('iconLogin');
    const botao = document.getElementById('loginButton');
    const paginaLogin = document.getElementById('paginaLogin');
    if (user) {
        console.log('Usuário logado:', user.email);
        paginaLogin.title(user.email);
        icon.classList.remove('bi-box-arrow-right');
        icon.classList.add('bi-box-arrow-left');
        // Permite deslogar ao clicar no ícone
        icon.onclick = (e) => {
            e.preventDefault();
            signOut(auth)
                .then(() => {
                    alert('Deslogado com sucesso!');
                })
                .catch(error => {
                    alert('Erro ao deslogar: ' + error.message);
                });
        };
    } else {
        console.log('Nenhum usuário logado');

        // Redireciona para tela de login
        paginaLogin.onclick = (e) => {
            e.preventDefault();
            window.location.href = "./login.html"; 
        };
    }
});

window.login = login;
window.cadastrar = cadastrar;