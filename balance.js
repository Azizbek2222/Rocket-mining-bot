// balance.js
import { supabase } from './supabase.js'

// Telegram user ID yoki fallback
const tg = window.Telegram?.WebApp
export const userId = tg?.initDataUnsafe?.user?.id || 'user_' + Date.now()

// Balansni yuklash
export async function loadBalance() {
    const { data } = await supabase
        .from('users')
        .select('balance')
        .eq('id', userId)
        .single()
    
    const bal = data?.balance || 0
    document.getElementById('balance').innerText = bal.toFixed(2)
}

// Balansga pul qo‘shish
export async function addBalance(amount) {
    const { data } = await supabase
        .from('users')
        .select('balance')
        .eq('id', userId)
        .single()
    
    if (!data) {
        await supabase.from('users').insert([{ id: userId, balance: amount }])
    } else {
        const newBalance = (data.balance || 0) + amount
        await supabase.from('users').update({ balance: newBalance }).eq('id', userId)
    }
    
    loadBalance()
}
