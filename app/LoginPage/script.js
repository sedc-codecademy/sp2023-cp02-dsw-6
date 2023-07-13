import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJarpymLTAY4gDD2hnR2SI7zxj7rgPxio",
  authDomain: "login-with-firebase-data-7ffe6.firebaseapp.com",
  projectId: "login-with-firebase-data-7ffe6",
  storageBucket: "login-with-firebase-data-7ffe6.appspot.com",
  messagingSenderId: "100613804258",
  appId: "1:100613804258:web:708e0e4d4a4914fd78cebb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");

const loginBtn = document.getElementById("loginBtn");

const signupLabel = document.querySelector("label.signup");
const loginLabel = document.querySelector("label.login");

const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

const signupUsername = document.getElementById('signupUsername');
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');

//login and signup label
signupLabel.onclick = () => {
  showSignupForm();
};

loginLabel.onclick = () => {
  showLoginForm();
};

//login and signup buttons
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login();
});
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  signup();
});


function showSignupForm() {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
}

function showLoginForm() {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
}


//Success and error messages

function setErrorFor(input,message){
  const formControl=input.parentElement;
  const small=formControl.querySelector('small');

//add  error message inside small
  small.innerText=message;

  //add error class
  formControl.className='field error';
};

function setSuccessFor(input,message){
  const formControl=input.parentElement;
  const small=formControl.querySelector('small');

//add  error message inside small
  small.innerText=message;

    //add error class
  formControl.className='field success';
}


//Login form
function login() {
  const email = loginUsername.value;
  const password = loginPassword.value;

  if (email !== "" && password !== "") {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in", user); 
        setSuccessFor(loginUsername,"User logged in! ")      
        setSuccessFor(loginPassword," ")   
        
        window.location.href ="../Homepage/Index.html";
      })
      .catch((error) => {
        console.log("Not logged in:", error); 
        setErrorFor(loginPassword,"Not logged yet!Try again!")       
        setErrorFor(loginUsername," ")       
      });
  } else {
    setError("Please fill out all fields.");
  }
}

//Register form
function signup() {
  const email = signupUsername.value;
  const password = signupPassword.value;
  const confirmPasswordValue = confirmPassword.value;
  

  if (email !== "" && password !== "" && confirmPasswordValue !== "") {
    if (password === confirmPasswordValue) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;      
          console.log("User created:", user);
          setSuccessFor(signupUsername,"User created!Now you can login!");
          setSuccessFor(signupPassword,"");
          setSuccessFor(confirmPassword,"");

          setTimeout(function() {
            showLoginForm()           
          }, 2500);                   
       
        })
        .catch((error) =>{   
                  console.log("User creation error", error);  
          setErrorFor(signupPassword,"User creation error!")  
          setErrorFor(signupUsername,"Incorrect email or password!")  
        });
      }
    else {   
      console.log("Passwords do not match.")
      if(password !=confirmPassword){
        setErrorFor(confirmPassword,"Password do not match.")
      }else
       setErrorFor(signupPassword,"User creation error!") 
          
    }
  }
else{
    setErrorFor(user,"Please fill out all fields.");
  
  }
}

  // signOut()
  //   .then(() => {
    //   alert("User logged out");
    //   window.location.href = "../LoginPage/Index.html";
    // })
    // .catch((error) => {
    //   console.log("Logout error:", error);
    // });
// });
