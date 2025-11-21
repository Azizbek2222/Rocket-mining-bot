// index.js
import { addBalance, loadBalance, userId } from './balance.js'

// Dastlab balansni yuklash
loadBalance()

// AdsGram init
const AdController = window.Adsgram.init({
  blockId: "int-17980" // 🔴 O‘zingning AdsGram blockId yoz
})

// Tugma bosilganda reklama ko‘rsatish
const showAdBtn = document.getElementById('showAdBtn')
showAdBtn.addEventListener('click', () => {
  AdController.show()
    .then(result => {
      if (result.done && !result.error) {
        addBalance(0.02) // 0.02 RUB qo‘shish
        alert("💰 0.02 RUB qo‘shildi!")
      } else {
        alert("Reklama tugamadi!")
      }
    })
    .catch(err => console.log('Ad error:', err))
})
