import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  orderBy,
  query
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG-G5fGPjK646jBhqp_3mKm5bpTIZTYHI",
  authDomain: "xayblog-a96a2.firebaseapp.com",
  projectId: "xayblog-a96a2",
  storageBucket: "xayblog-a96a2.appspot.com",
  messagingSenderId: "879518599203",
  appId: "1:879518599203:web:33be4e39e938ace9674996",
  measurementId: "G-6309PHM87C",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Get firestore service
const db = getFirestore();

// Get Docs ref
const blogsRef = collection(db, "blogs");

//Get users ref
const usersRef = collection(db, "users");

// Get Auth service
const auth = getAuth();


// Get DOM elements 

const signInForm = document.getElementById("signInForm");
const signOutBtn = document.getElementById("signOutBtn");
const signOutBtnMobile = document.querySelector('#signOutBtnMobile');
const openSignInForm = document.getElementById('loginBtn');
const loginBtnMobile = document.querySelector('#loginBtnMobile');
const registerForm = document.getElementById("registerForm");
const createBlogForm = document.getElementById("createBlogForm");
const registerBtn = document.getElementById('registerBtn');
const registerBtnMobile = document.querySelector('#registerBtnMobile');
const openCreateBlogBtn = document.getElementById('openCreateBlogBtn');
const openCreateBlogOnMobile = document.querySelector('#openCreateBlogOnMobile')

// Display buttons , on user Status 
onAuthStateChanged(auth, (user) => {
  if (user) {
    openSignInForm.style.display = "none";
    signOutBtn.style.display = "block";
    registerBtn.style.display = 'none'
    loginBtnMobile.style.display = 'none'
  } else {
    openSignInForm.style.display = "block";
    signOutBtn.style.display = "none";
    registerBtn.style.display = 'block'
  }
});



// query by created time 
const q = query(blogsRef, orderBy('createdAt'));


// Get real time blogs
onSnapshot(q, (snapshot) => {
    const data = snapshot.docs;
    if (data) {
      displayBlogs(data);
    } else {
      displayBlogs([]);
    }
})

// Create user

registerBtn.addEventListener('click', () => {
    registerForm.style.display = 'block'
})

registerBtnMobile.addEventListener('click', () => {
    registerForm.style.display = 'block'
})

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerForm.querySelector("#signUpEmail").value;
  const password = registerForm.querySelector("#signUpPassword").value;
  const username = registerForm.querySelector("#signUpUsername").value;

  const newUser = {
    email: email,
    password: password,
    username: username,
  };

  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((userCredentials) => {
      // console.log(userCredentials)
      const uid = userCredentials.user.uid;
      createUserInFirestore(newUser.email, newUser.username, uid);
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
      console.log(error.message);
    });

  registerForm.reset();
  registerForm.style.display = 'none'
});

function createUserInFirestore(email, username, uid) {
  const newUser = {
    email: email,
    username: username,
    uid: uid,
  };

  setDoc(doc(db, "users", uid), newUser)
    .then(() => {
      console.log("Document successfully written!");
      const userRef = doc(db, 'users', uid);
      getDoc(userRef).then((snapshot) => {
        const username = snapshot.data().username;
       alert(`Hello  ${username} ! Welcome to "XayBlogZ"`);
      })
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}



// log user out 

signOutBtn.addEventListener("click", () => {
    signOut(auth)
    .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
       console.error("Error signing out: ", error);
       });
      window.location.reload();
});

signOutBtnMobile.addEventListener("click", () => {
  signOut(auth)
  .then(() => {
      console.log("Successfully signed out");
    })
    .catch((error) => {
       console.error("Error signing out: ", error);
       });
      window.location.reload();
});



// Sign In

openSignInForm.addEventListener('click', () => { 
    signInForm.style.display = "block";

});

loginBtnMobile.addEventListener('click', () => {
  signInForm.style.display = "block";
})

signInForm.addEventListener("submit", (e) => {

    e.preventDefault();
   
    const email = signInForm.querySelector("#signInEmail").value;
    const password = signInForm.querySelector("#signInPasswrod").value;
     
    const user = { 
        email: email,
        password: password,
    }
   
    signInWithEmailAndPassword(auth, user.email, user.password).then((userCredentials) => {
      
        const uid = userCredentials.user.uid 

        const userRef = doc(db, "users", uid);

        getDoc(userRef).then((snapshot) => {
            const username = snapshot.data().username;
            greeting(username)
        });


    }).catch((error) => {
            console.log(error);
            alert(error.message);
    })
   signInForm.reset();
   signInForm.style.display = "none";
})

function greeting(username) {
    alert(`Welcome back ${username} !!!!`)
}





// open blog form with the active classList


openCreateBlogBtn.addEventListener("click", () => {
  createBlogForm.classList.toggle('active');
});

openCreateBlogOnMobile.addEventListener("click", () => {
  createBlogForm.classList.toggle('active');
});

// Create Blogs
createBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const blogTitle = createBlogForm.querySelector("#blogTitle").value;
  const blogContent = createBlogForm.querySelector("#blogContent").value;

  // Check user statu before adding blogs
  auth.onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, "users", uid);
      getDoc(userRef)
        .then((snapshot) => {
          const userData = snapshot.data().username;

          // add blog to firestore with current username
          addDoc(blogsRef, {
            title: blogTitle,
            content: blogContent,
            username: userData,
            uid: uid,
            createdAt : serverTimestamp()
          })
            .then(() => {
              console.log("Document successfully written!");
              return
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } else {
      alert("Sign In, or Create an Account to add Blog");
      return
    }
  }, { once : true});

  createBlogForm.reset();
  createBlogForm.classList.remove('active');
});

