// Firebase v9 SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get, set, update, onValue, runTransaction }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDm5joBc7dicQrPvrmtH_v-RMhkQrIPcxY",
    authDomain: "nexalum-1.firebaseapp.com",
    databaseURL: "https://nexalum-1-default-rtdb.firebaseio.com",
    projectId: "nexalum-1",
    storageBucket: "nexalum-1.appspot.com",
    messagingSenderId: "418037039727",
    appId: "1:418037039727:web:8f0d8ed7c00cdf613f039a"
};

// Firebase start
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Foydalanuvchi ID
let userId = localStorage.getItem("userId");
if (!userId) {
    userId = "user_" + Date.now();
    localStorage.setItem("userId", userId);
}

// Balansni yuklash
export function loadBalance() {
    const balanceRef = ref(db, "users/" + userId + "/balance");
    
    get(balanceRef).then(snapshot => {
        let val = snapshot.exists() ? snapshot.val() : 0;
        document.getElementById("balance").innerText = val.toFixed(2);
    });
}

// Balansga pul qo‘shish
export function addBalance(amount) {
    const balanceRef = ref(db, "users/" + userId + "/balance");
    
    runTransaction(balanceRef, current => {
        return (current || 0) + amount;
    }).then(() => {
        loadBalance();
    });
}

// Dastlabki balansni ko‘rsatish
loadBalance();
