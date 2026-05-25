<template>
  <div class="form-container">
    <h2>Modifier le profil de {{ form.firstname }}</h2>

    <form @submit.prevent="handleSubmit" class="student-form">
      <div class="form-row">
        <div class="form-group">
          <label for="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            v-model="form.firstname"
            required
            placeholder="Ex: Jean"
          />
        </div>

        <div class="form-group">
          <label for="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            v-model="form.lastname"
            required
            placeholder="Ex: Dupont"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">Adresse Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="jean.dupont@ecole.com"
          />
        </div>

        <div class="form-group">
          <label for="avatar_url">URL de l'avatar</label>
          <input
            type="url"
            id="avatar_url"
            v-model="form.avatar_url"
            placeholder="https://lien-image.com/avatar.png"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="specialty">Spécialité</label>
          <input
            type="text"
            id="specialty"
            v-model="form.specialty"
            placeholder="Ex: Développement Web"
          />
        </div>

        <div class="form-group">
          <label for="grade">Classe / Niveau</label>
          <input type="text" id="grade" v-model="form.grade" placeholder="Ex: Master 2" />
        </div>
      </div>

      <div class="form-group">
        <label for="linkedin_url">Lien Profil LinkedIn</label>
        <input
          type="url"
          id="linkedin_url"
          v-model="form.linkedin_url"
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div class="form-group">
        <label for="bio">À propos (Bio)</label>
        <textarea
          id="bio"
          v-model="form.bio"
          rows="4"
          placeholder="Racontez-nous en un peu plus sur cet étudiant..."
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" @click="$emit('cancel')" class="btn-cancel">Annuler</button>
        <button type="submit" class="btn-submit">Enregistrer les modifications</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStudentsStore } from '@/stores/StudentsStore'

const studentStore = useStudentsStore()
const router = useRouter()
const route = useRoute()

// création du tableau pour le form (payload)
const form = ref({
  id: null,
  firstname: '',
  lastname: '',
  email: '',
  avatar_url: '',
  specialty: '',
  grade: '',
  linkedin_url: '',
  bio: '',
})

// chargement des élèves depuis le store
onMounted(() => {
  const studentId = route.params.id
  const studentsFromStore = studentStore.students.find((s) => s.id === studentId)
  if (studentsFromStore) {
    form.value = { ...studentsFromStore }
  } else {
    console.log('Erreur lors du chargement')
  }
})

const handleSubmit = async () => {
  try {
    await studentStore.updateStudents(form.value)
    router.push(`/students/${form.value.id}`)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des élèves : ', error)
  }
}
</script>

<style scoped>
.form-container {
  max-width: 650px;
  margin: 0 auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #35495e;
  margin-bottom: 25px;
  font-size: 1.5rem;
}

.student-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Gestion du responsive : 2 colonnes sur grand écran, 1 sur mobile */
.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1;
  min-width: 250px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #35495e;
}

input,
textarea {
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  color: rgb(56, 54, 54);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b883;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

textarea {
  resize: vertical;
}

/* Boutons de bas de formulaire */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
}

.btn-submit,
.btn-cancel {
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-submit {
  background-color: #42b883;
  color: white;
}

.btn-submit:hover {
  background-color: #3aa372;
}

.btn-cancel {
  background-color: #f1f5f9;
  color: #64748b;
}

.btn-cancel:hover {
  background-color: #e2e8f0;
  color: #334155;
}
</style>
