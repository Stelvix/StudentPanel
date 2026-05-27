import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null)
    const nomAdmin = ref('')
    const loading = ref(false)

    async function login(nomInput, emailInput, passwordInput) {
      loading.value = true
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailInput,
          password: passwordInput,
        })

        if (error) {
          throw new Error('Identifiants incorrects.')
        }
        if (data.user.email !== 'admin@ecole.com') {
          await supabase.auth.signOut()
          throw new Error("Accès refusé. Vous n'êtes pas l'administrateur.")
        }

        user.value = data.user
        nomAdmin.value = nomInput

        return { success: true }
      } catch (err) {
        alert(err.message)
        return { success: false }
      } finally {
        loading.value = false
      }
    }

    async function logout() {
      await supabase.auth.signOut()
      user.value = null
      nomAdmin.value = ''
      //localStorage.removeItem('token')
    }

    return {
      user,
      nomAdmin,
      loading,
      login,
      logout,
    }
  },
  {
    persist: true,
  },
)
