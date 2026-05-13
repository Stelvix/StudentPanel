<template>
  <div class="profile-container">
    <div v-if="store.loading" class="loader">Chargement...</div>

    <div v-else-if="student" class="profile-card">
      <div class="profile-header">
        <img :src="student.avatar_url" alt="Avatar" class="profile-avatar" />
        <h1 class="profile-name">{{ student.firstname }} {{ student.lastname }}</h1>
        <div class="tags">
          <span class="profile-tag">{{ student.specialty }}</span>
          <span class="profile-tag-grade">{{ student.grade }}</span>
        </div>
        <a :href="`mailto:${student.email}`" class="email"> {{ student.email }}</a>
      </div>

      <div class="profile-body">
        <h3>À propos</h3>
        <p>{{ student.bio }}</p>
      </div>

      <Icon
        :icon="isFavorite ? 'mdi:star' : 'mdi:star-outline'"
        :style="{ color: isFavorite ? 'gold' : 'gray' }"
        @click="isFavorite = !isFavorite"
        width="32"
      />

      <div class="profile-footer">
        <a :href="student.linkedin_url" target="_blank" class="btn-linkedin"> LinkedIn </a>
        <router-link to="/" class="btn-back">Retour à la liste</router-link>
      </div>
    </div>

    <div v-else class="error-msg">Oups ! Cet étudiant n'existe pas.</div>
  </div>
</template>

<script setup>
import { useStudentsStore } from '@/stores/StudentsStore'
import { useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
const route = useRoute()
//const router = useRouter()

const store = useStudentsStore()

// récupération de l'étudiant depuis le store en fonction de son ID
const student = computed(() => store.getStudentsById(route.params.id))

onMounted(async () => {
  if (store.students.length === 0) {
    await store.getStudents()
  }
})

const isFavorite = ref(false)
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 20px;
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
}

.tags {
  display: flex;
  justify-content: center;
  gap: 5%;
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
}

.profile-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.btn-linkedin {
  background: #0077b5;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
}

.btn-back {
  color: #7f8c8d;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
}

.btn-back:hover {
  text-decoration: none;
  background: #42b883;
  text-align: center;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  transition: ease-in-out 0.2s;
}
</style>
