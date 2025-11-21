import { addBalance } from "./supabase.js";

// AdsGram init
const AdController = window.Adsgram.init({
  blockId: "int-17980" // ❗ AdsGram block ID
});

document.getElementById("showAdBtn").addEventListener("click", () => {
  
  AdController.show().then(result => {
    
    if (result.done && !result.error) {
      addBalance(0.02); // balansga qo'shish
      alert("💰 0.02 RUB qo‘shildi!");
    } else {
      alert("Reklama tugamadi!");
    }
    
  }).catch(err => {
    console.log("Ad error:", err);
  });
  
});
