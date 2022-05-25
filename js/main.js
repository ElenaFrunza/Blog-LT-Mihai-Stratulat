
const firebaseConfig = {
    apiKey: "AIzaSyCeVawoIyIQy03EJi5KLmfUJWnqXiBCDk8",
    authDomain: "blog---school.firebaseapp.com",
    projectId: "blog---school",
    storageBucket: "blog---school.appspot.com",
    messagingSenderId: "757543380936",
    appId: "1:757543380936:web:c5ae9a99a538e938c682fd",
    measurementId: "G-1CF5KQM539"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}


const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username')

let user=null;
let admins=["rpVYcytbu1PVuXHXnN9fWphJlzo2", "23"]



//setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

//referinta la serviciul de autentificare
const auth= firebase.auth();

//referinta la baza noastra de date
const db = firebase.firestore();

//referinat la colectia de postari din BD
const postariDb = db.collection('postari');

//alegem provider de logare GOOGLE
const provider = new firebase.auth.GoogleAuthProvider();


loginBtn.onclick = function(){
    console.log("logare...");
    auth.signInWithPopup(provider).then(function(){window.location.reload();});

}
logoutBtn.onclick=function(){
    auth.signOut();
    window.location.reload();
}
 
function isAdmin(){
    let admin;

    if(user == null)
    return false;
    admin = admins.includes(user.uid);//true sau false
    return admin;

}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate()+1;

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;


    let result = day+"/"+ month+"/"+year;
    return result;
}


auth.onAuthStateChanged(function(fuser){
user = fuser;
console.log(user);
if (user != null){
    //logat in sistem
    logoutBtn.style.display="block";
    loginBtn.style.display="none";
    salutare.innerHTML= "Salutare, " +  user.displayName;



    if (isAdmin()==true){
        postareBtn.style.display='block';
    }
}
else {postareBtn.style.display='none';
    //nu e logat in sistem
    logoutBtn.style.display="none";
    loginBtn.style.display="block";
    postareBtn.style.display='none';
}

document.querySelector('body').style.display = "block";

})

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}


