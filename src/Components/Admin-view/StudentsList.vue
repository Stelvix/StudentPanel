<script setup>
import { onMounted } from 'vue'
import { useStudentsStore } from '@/stores/StudentsStore'
import { useRouter } from 'vue-router'

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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
}
.actions {
  display: flex;
  gap: 20px;
}
.button {
  text-decoration: none;
  color: #35495e;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
}
.button {
  background-color: rgba(66, 184, 131, 0.1);
  color: #42b883;
}
</style>
