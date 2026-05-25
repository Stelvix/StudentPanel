<script setup>
import { onMounted } from 'vue'
import { useStudentsStore } from '@/stores/StudentsStore'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const store = useStudentsStore()

function viewStudents(id) {
  router.push(`/students/${id}`)
}

onMounted(() => {
  if (store.students.length === 0) {
    store.getStudents()
  }
})
</script>

<template>
  <div class="cards-students">
    <h2>Annuaire des étudiants</h2>

    <p v-if="store.loading">Chargement des profils...</p>

    <p v-else-if="store.students.length === 0">Aucun étudiant trouvé.</p>

    <div v-else class="grid">
      <div v-for="student in store.students" :key="student.id" class="card">
        <img :src="student.avatar_url" alt="Avatar" width="50" />
        <h3>{{ student.firstname }} {{ student.lastname }}</h3>
        <p><strong>Spécialité :</strong> {{ student.specialty }}</p>
        <p>{{ student.bio.length > 10 ? student.bio.slice(0, 90) + '...' : student.bio }}</p>

        <div class="actions">
          <a :href="student.linkedin_url" target="_blank"> LinkedIn</a>
          <button class="button" @click="viewStudents(student.id)">Voir plus</button>
          <Icon
            :icon="store.favoriteIds.includes(student.id) ? 'mdi:star' : 'mdi:star-outline'"
            :style="{ color: store.favoriteIds.includes(student.id) ? 'gold' : 'gray' }"
            @click="store.toggFavorites(student.id)"
            width="32"
          />
        </div>
      </div>
    </div>

    <hr />

    <h3>Vos Favoris</h3>

    <div class="grid">
      <div v-for="student in store.getAllStudentsByStars" :key="student.id" class="card">
        <img :src="student.avatar_url" :alt="`Photo de profil de ${student.firstname}`" />
        <h3>{{ student.firstname }} {{ student.lastname }}</h3>
        <p>{{ student.bio.length > 10 ? student.bio.slice(0, 90) + '...' : student.bio }}</p>

        <div class="actions">
          <a :href="student.linkedin_url" target="_blank">Linkedin</a>
          <button class="button" @click="viewStudents(student.id)">Voir plus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grille principale + Déclaration des variables */
.grid {
  /* Variables locales au composant */
  --color-primary: #42b883;
  --color-primary-bg: rgba(66, 184, 131, 0.1);
  --color-text-dark: #35495e;
  --color-bg-light: #ffffff;
  --color-bg-card: #f9f9f9;
  --shadow-subtle: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --radius-standard: 8px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* Cartes */
.card {
  padding: 20px;
  background-color: var(--color-bg-card);
  border: 1px solid #eef2f5;
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-subtle);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Conteneur d'actions */
.actions {
  display: flex;
  gap: 12px;
  margin-top: 15px;
}

/* Style du bouton */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-primary);
  background-color: var(--color-primary-bg);
  border: none;
  border-radius: var(--radius-standard);
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.button:hover {
  background-color: var(--color-primary);
  color: var(--color-bg-light);
}
</style>
