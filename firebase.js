// Firebase modullari
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get, runTransaction }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7VLHdjPqf_tobSiBczGbN8H7YlFwq9Wg",
    authDomain: "magnetic-alloy-467611-u7.firebaseapp.com",
    databaseURL: "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com",
    projectId: "magnetic-alloy-467611-u7",
    storageBucket: "magnetic-alloy-467611-u7.firebasestorage.app",
    messagingSenderId: "589500919880",
    appId: "1:589500919880:web:75266879479f692d51687d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ⚡ Telegram user ID
const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe?.user?.id || "unknown_user";

// Balansni yuklash
export function loadBalance() {
    const balanceRef = ref(db, "users/" + userId + "/balance");
    
    get(balanceRef).then(snapshot => {
        let bal = snapshot.exists() ? snapshot.val() : 0;
        document.getElementById("balance").innerText = bal.toFixed(2);
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
