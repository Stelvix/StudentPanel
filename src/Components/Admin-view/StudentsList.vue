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

    <p v-if="store.loading" class="loading-msg">Chargement des profils...</p>
    <p v-else-if="store.students.length === 0" class="empty-msg">Aucun étudiant trouvé.</p>

    <div v-else class="grid">
      <div v-for="student in store.students" :key="student.id" class="card">
        <img :src="student.avatar_url" alt="Avatar" class="card-image" />

        <h3>{{ student.firstname }} {{ student.lastname }}</h3>
        <p class="specialty">
          <span>{{ student.specialty || 'Général' }}</span>
        </p>
        <p class="bio">
          {{
            student.bio && student.bio.length > 30
              ? student.bio.slice(0, 30) + '...'
              : student.bio || 'Aucune biographie.'
          }}
        </p>

        <div class="actions">
          <a :href="student.linkedin_url" target="_blank" class="btn-linkedin">
            <Icon icon="mdi:linkedin" width="20" />
          </a>
          <button class="button" @click="viewStudents(student.id)">Voir plus</button>
          <Icon
            :icon="store.favoriteIds.includes(student.id) ? 'mdi:star' : 'mdi:star-outline'"
            :style="{ color: store.favoriteIds.includes(student.id) ? '#ffcc00' : '#b0bec5' }"
            class="star-icon"
            @click="store.toggFavorites(student.id)"
            width="28"
          />
        </div>
      </div>
    </div>

    <div class="separator-container">
      <hr class="separator" />
    </div>

    <h3>Vos Favoris</h3>

    <p
      v-if="!store.getAllStudentsByStars || store.getAllStudentsByStars.length === 0"
      class="empty-msg-fav"
    >
      Vous n'avez pas encore de favoris. Cliquez sur l'étoile d'un profil pour l'ajouter !
    </p>

    <div v-else class="grid">
      <div v-for="student in store.getAllStudentsByStars" :key="student.id" class="card card-fav">
        <img
          :src="student.avatar_url"
          :alt="`Photo de profil de ${student.firstname}`"
          class="card-image"
        />

        <h3>{{ student.firstname }} {{ student.lastname }}</h3>
        <p class="specialty">
          <span>{{ student.specialty || 'Général' }}</span>
        </p>
        <p class="bio">
          {{
            student.bio && student.bio.length > 30
              ? student.bio.slice(0, 30) + '...'
              : student.bio || 'Aucune biographie.'
          }}
        </p>

        <div class="actions">
          <a :href="student.linkedin_url" target="_blank" class="btn-linkedin">
            <Icon icon="mdi:linkedin" width="20" />
          </a>
          <button class="button" @click="viewStudents(student.id)">Voir plus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-students {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 8px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: #42b883;
  border-radius: 2px;
}

h3 {
  color: #2c3e50;
  font-size: 1.4rem;
  margin: 20px 0 10px 0;
}

/* Grille principale */
.grid {
  --color-primary: #42b883;
  --color-primary-bg: rgba(66, 184, 131, 0.1);
  --color-text-dark: #35495e;
  --color-bg-light: #ffffff;
  --color-bg-card: #ffffff;
  --shadow-subtle: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 5px 10px -5px rgba(0, 0, 0, 0.04);
  --radius-standard: 12px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 15px 0;
}

.card {
  padding: 28px 0 0 0;
  background-color: var(--color-bg-card);
  border: 1px solid #f0f4f8;
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-subtle);
  transition: box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.12);
}

.card-fav {
  border: none;
}

.card-image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease;
}

.card:hover .card-image {
  transform: scale(1.04);
}

.specialty {
  margin: 0 0 12px 0;
}

.specialty span {
  background-color: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bio {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

.card h3,
.card p {
  padding: 0 24px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  width: 100%;
  box-sizing: border-box;
  background-color: #fcfdfe;
}

.button {
  flex-grow: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  color: white;
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.button:hover {
  background-color: #36a273;
}

.button:active {
  transform: scale(0.98);
}

.btn-linkedin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #f1f5f9;
  color: #0077b5;
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.btn-linkedin:hover {
  background-color: #0077b5;
  color: white;
}

.star-icon {
  cursor: pointer;
}

.star-icon:hover {
  transform: scale(1.2);
}

/* Séparateur poli */
.separator-container {
  padding: 30px 0;
}

.separator {
  border: 0;
  height: 1px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(226, 232, 240, 1), rgba(0, 0, 0, 0));
}

/* États messages */
.loading-msg,
.empty-msg,
.empty-msg-fav {
  text-align: center;
  color: #94a3b8;
  font-style: italic;
  padding: 40px 0;
}

.empty-msg-fav {
  background-color: #f8fafc;
  border: 1px outset #cbd5e1;
  border-radius: 8px;
}
</style>
