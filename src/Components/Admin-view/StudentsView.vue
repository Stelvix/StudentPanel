<template>
  <div class="profile-container">
    <div v-if="store.loading" class="loader">Chargement...</div>

    <div v-else-if="student" class="profile-card">
      <div class="profile-header">
        <img :src="student.avatar_url" alt="Avatar" class="profile-avatar" />
        <h1 class="profile-name">{{ student.firstname }} {{ student.lastname }}</h1>
        <div class="tags">
          <span class="profile-tag">{{ student.specialty || 'Général' }}</span>
          <span class="profile-tag-grade">{{ student.grade }}</span>
        </div>
        <a :href="`mailto:${student.email}`" class="email"> {{ student.email }}</a>
      </div>

      <div class="profile-body">
        <h3>À propos</h3>
        <p class="profile-bio">
          {{ student.bio || 'Aucune biographie disponible pour le moment.' }}
        </p>
      </div>

      <Icon
        :icon="store.favoriteIds.includes(student.id) ? 'mdi:star' : 'mdi:star-outline'"
        :style="{
          color: store.favoriteIds.includes(student.id) ? 'gold' : 'gray',
          cursor: 'pointer',
        }"
        @click="store.toggFavorites(student.id)"
        width="32"
      />

      <div class="profile-footer">
        <a :href="student.linkedin_url" target="_blank" class="btn-linkedin"> LinkedIn </a>
        <button @click="modifyStudents(student.id)" class="btn-modify">Modifier</button>
        <button @click="deleteStudents(student.id)" class="btn-delete">Supprimer</button>
        <router-link to="/" class="btn-back">Retour à la liste</router-link>
      </div>
    </div>

    <div v-else class="error-msg-box">Oups ! Cet étudiant n'existe pas.</div>
  </div>
</template>

<script setup>
import { useStudentsStore } from '@/stores/StudentsStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const store = useStudentsStore()

const student = computed(() => store.getStudentsById(route.params.id))

function modifyStudents(id) {
  router.push(`/modifyStudents/${id}`)
}

async function deleteStudents(id) {
  const confirmation = confirm(
    'Êtes-vous sûr de vouloir supprimer cet élève ? Une fois supprimé, il sera impossible de revenir en arrière !',
  )

  if (confirmation) {
    await store.deleteStudents(id)

    if (!store.error) {
      router.push('/')
      alert('Élève supprimé avec succès !')
    } else {
      alert(`Erreur lors de la suppression : ${store.error}`)
    }
  }
}

onMounted(async () => {
  if (store.students.length === 0) {
    await store.getStudents()
  }
})
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 70vh;
}

.profile-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
  padding: 40px;
  text-align: center;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #f4f7f6;
  margin-bottom: 20px;
}

.profile-name {
  font-size: 2rem;
  margin: 10px 0;
  color: #2c3e50;
}

.email {
  background: #e3e1e16f;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  color: #34495e;
  display: inline-block;
  margin-top: 15px;
}

.email:hover {
  background: #dcdada6f;
}

.tags {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.profile-tag {
  background: #42b88320;
  color: #42b883;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.profile-tag-grade {
  background: #740cec20;
  color: #370570fc;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.profile-body {
  margin: 30px 0;
  text-align: left;
  line-height: 1.6;
  background: #fafbfc;
  padding: 20px;
  border-radius: 12px;
}

.profile-body h3 {
  margin-top: 0;
  color: #2c3e50;
}

.profile-bio {
  margin: 0;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
  color: #555;
}

.profile-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-linkedin {
  background: #0077b5;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-linkedin:hover {
  background: #005987;
}

.btn-modify {
  background: rgb(0, 238, 255);
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-modify:hover {
  opacity: 0.8;
}

.btn-delete {
  background: rgb(219, 7, 7);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: rgb(170, 5, 5);
}

.btn-back {
  color: #7f8c8d;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  transition: ease-in-out 0.2s;
}

.btn-back:hover {
  background: #42b883;
  color: white;
}

.loader,
.error-msg-box {
  font-size: 1.2rem;
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
  padding: 40px;
}
</style>
