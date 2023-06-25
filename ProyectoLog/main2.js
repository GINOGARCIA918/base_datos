const firebaseConfig = {
    apiKey: "AIzaSyC_mtIOmQMP5L6CtlCXx6QPHroRWHO6ub4",
    authDomain: "registroweb-a7e96.firebaseapp.com",
    projectId: "registroweb-a7e96",
    storageBucket: "registroweb-a7e96.appspot.com",
    messagingSenderId: "657625346792",
    appId: "1:657625346792:web:6dff9eae17c2f56aa6cf5d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//Llamando elementos de html
let btnRegistrar = document.getElementById('btnAceptarRegistrate');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion')

//Funcion Registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('emailRegistrate').value;
    let password = document.getElementById('passwordRegistrate').value;
    

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log('Inicio de Sesion correcta');
            contenidoDeLaWeb.classList.replace('ocultar','mostrar');
            formulario.classList.replace('mostrar','ocultar');
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

//Funcion CerrarSesion
btnCerrarSesion.addEventListener('click', () => {

})


        
})