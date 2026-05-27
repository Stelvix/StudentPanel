<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2>Connexion Administrateur</h2>
      <p class="subtitle">Accès sécurisé à l'annuaire des élèves</p>

      <form @submit.prevent="handleFormSubmit">
        <div class="input-group">
          <label for="nom">Votre Nom</label>
          <input id="nom" v-model="nom" type="text" placeholder="Ex: M. Martin" required />
        </div>

        <div class="input-group">
          <label for="email">Adresse Email</label>
          <input id="email" v-model="email" type="email" placeholder="admin@ecole.com" required />
        </div>

        <div class="input-group">
          <label for="password">Mot de passe</label>
          <input id="password" v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? 'Vérification...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const router = useRouter()

const nom = ref('')
const email = ref('')
const password = ref('')

async function handleFormSubmit() {
  const result = await authStore.login(nom.value, email.value, password.value)

  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-family: sans-serif;
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaeaea;
}
h2 {
  margin: 0 0 5px 0;
  color: #333;
  text-align: center;
}
.subtitle {
  margin: 0 0 25px 0;
  color: #666;
  font-size: 14px;
  text-align: center;
}
.input-group {
  margin-bottom: 20px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #444;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
}
input:focus {
  border-color: #42b983;
  outline: none;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background-color: #3aa876;
}
button:disabled {
  background-color: #a3e0c4;
  cursor: not-allowed;
}
</style>
