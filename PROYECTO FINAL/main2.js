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
const db = firebase.firestore();


//Llamando elementos de html
let btnRegistrar = document.getElementById('btnAceptarRegistrate');
let btnIngresar = document.getElementById('btnAceptarIniciarSesion');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let contenidoDeLaWeb2 = document.getElementById('contenidoDeLaWeb2');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
let btnFacebook = document.getElementById('btnFacebook');
/*let txtTitulo = document.getElementById('txtTitulo');
let txtDescripcion = document.getElementById('txtDescripcion');*/
let btnPublicar = document.getElementById('btnPublicar');
let comentarios = document.getElementById('comentarios');
let pagPrincipal = document.getElementById('pagPrincipal');

//Funcion Registrar
btnRegistrar.addEventListener('click', () => {
  let email = document.getElementById('emailRegistrate').value;
  let password = document.getElementById('passwordRegistrate').value;


  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log('Registro de correcto del Correo');
      cargarJSON();
      /*contenidoDeLaWeb.classList.replace('ocultar','mostrar');
      formulario.classList.replace('mostrar','ocultar');*/
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
})

//Funcion Iniciar Sesion
btnIngresar.addEventListener('click', () => {
  let email = document.getElementById('emailIniciarSesion').value;
  let password = document.getElementById('passwordIniciarSesion').value;
  console.log(" Tu email es " + email + " y tu passwordes " + password);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('Inicio de Sesion correctamente');
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      contenidoDeLaWeb2.classList.replace('ocultar', 'mostrar');
      comentarios.classList.replace('ocultar', 'mostrar');
      pagPrincipal.classList.replace('mostar','ocultar');
      //formulario.classList.replace('mostrar','ocultar');
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
})

//Funcion CerrarSesion
btnCerrarSesion.addEventListener('click', () => {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('Cerro Sesion Exitosamente');
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    contenidoDeLaWeb2.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
    comentarios.classList.replace('mostrar', 'ocultar');
    pagPrincipal.classList.replace('ocultar','mostrar');
  }).catch((error) => {
    // An error happened.
    console.log("Error con el cierre de sesion");
  });
})

//Funcion estado usuario
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
    contenidoDeLaWeb2.classList.replace('ocultar', 'mostrar');
    comentarios.classList.replace('ocultar', 'mostrar');
    pagPrincipal.classList.replace('mostrar','ocultar');
    imprimirComentariosEnPantalla();
    cargarJSON()
    //formulario.classList.replace('mostrar','ocultar');
    // ...
  } else {
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    contenidoDeLaWeb2.classList.replace('mostrar', 'ocultar');
    comentarios.classList.replace('mostrar', 'ocultar');
    pagPrincipal.classList.replace('ocultar','mostrar');
    imprimirComentariosEnPantalla();
    //formulario.classList.replace('ocultar','mostrar');
    // User is signed out
    // ...
  }
});

//Funcion Login Google
btnGoogle.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // Signed in
      console.log("Iniciaste sesion con Google");

    }).catch((error) => {
      // Handle Errors here.
      var errorMessage = error.message;
      console.log("Error de login con Google");
    });
})

//Funcion Login Facebook
btnFacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      console.log("Iniciaste sesion con Facebook");
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
})

//Funcion JSON
function cargarJSON() {
  fetch('data.json')
    .then(function (res) {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let html = '';
      data.forEach((datos) => {
        html += `
           <div style="padding:20px; margin:10px auto; background-color:orange; border-radius: 10px; 
           border: 3px solid blueviolet;">
           <ul><h2><li style="font-family: 'Krona One';"><i>Desarrollador:</i></h2>
           <h1 style="color:red; font-family: 'Trade Winds';">${datos.marca}</h1></li></ul> 
           <h2><li style="font-family: 'Krona One';"><i>Nombre del Juego:</i></h2>
           <h1 Style="color:blue; font-family: 'Trade Winds';">${datos.nombre}</h1></li></ul>
           <img src=${datos.img} width= 500px ;>
           <h2><li style="font-family: 'Krona One';"><i>Precio del Juego:</i></h2>
           <h1 style="color:blueviolet; font-family: 'Trade Winds';">S/. ${datos.precio}</h1></li></ul>
           </div>
           `;
      });
      document.getElementById('contenidoDeLaWeb2').innerHTML = html;
    })
}

//Funcion Publicar
btnPublicar.addEventListener('click', () => {

  db.collection("comentarios").add({
    titulo: txtTitulo = document.getElementById('txtTitulo').value,
    descripcion: txtDescripcion = document.getElementById('txtDescripcion').value,
  })
    .then((docRef) => {
      console.log("Se guardo correctamente el comentario: ", docRef.id);
      imprimirComentariosEnPantalla();
    })
    .catch((error) => {
      console.error("Error al guardar el comentario: ", error);
    });

})

//FUNCION MOSTRAR COMENTARIOS Firestore
function imprimirComentariosEnPantalla(){
  db.collection("comentarios").get().then((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.data().titulo}`);
        console.log(`${doc.data().descripcion}`);
        var listarDatos = `<br>
        <div style="border: 1px solid blueviolet; background-color: orange; padding: 20px; border-radius: 20px;">
        <ul class ="listarDatos">
            <li><h3 class="listarDatos" style="color: blueviolet; font-family: 'Krona One';"><b> ${doc.data().titulo}</b> </h3></li>
            <p style="font-size: 20px; font-family: 'Source Code Pro'"><b> ${doc.data().descripcion} </b></p>
        </ul>
        </div>    
       `;
       html += listarDatos;
    }); document.getElementById('imprimirComentariosEnPantalla').innerHTML = html;
});
}

//FUNCION ALERTA
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('btnPublicar')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<br><div class="alert alert-' 
  + type + ' alert-dismissible" role="alert">' + message +
   '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('<h4 style="font-family:Source Code Pro;"><b><svg class="bi flex-shrink-0 me-2" width="26" height="26" role="img"><use xlink:href="#check-circle-fill"/></svg> Genial, su comentario fue publicado con exito :D </b></h4>' , 'success')
  })
}
