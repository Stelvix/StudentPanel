import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    loading: false,
    favoriteIds: [],
    error: null,
  }),

  actions: {
    async getStudents() {
      this.loading = true
      const { data, error } = await supabase.from('students').select('*')

      if (error) {
        this.error = error.message
      } else {
        this.students = data
      }
      this.loading = false
    },

    toggFavorites(StudentId) {
      const searchId = this.favoriteIds.indexOf(StudentId)

      if (searchId > -1) {
        this.favoriteIds.splice(searchId, 1)
      } else {
        this.favoriteIds.push(StudentId)
      }
    },

    async updateStudents(updateStudents) {
      this.loading = true
      const { data, error } = await supabase
        .from('students')
        .upsert(updateStudents)
        .select()
        .single()
      if (!error) {
        this.students = this.students.map((s) => (s.id === updateStudents.id ? data : s))
      } else {
        this.error = error.message
      }
      this.loading = false
    },

    async deleteStudents(idStudent) {
      this.loading = true
      // on recherche d'abord le student
      const { error } = await supabase.from('students').delete().eq('id', idStudent)
      if (!error) {
        this.students = this.students.filter((s) => s.id !== idStudent)
        this.favoriteIds = this.favoriteIds.filter((s) => s.id !== idStudent)
      } else {
        this.error = error.message
        console.error('Impossible de supprimer cet élève :', error.message)
      }
      this.loading = false
    },
  },

  getters: {
    getStudentsById: (state) => {
      return (id) => state.students.find((s) => s.id === id)
    },
    isStudentFavorites: (state) => {
      return (id) => state.favoriteIds.includes(id)
    },
    getAllStudentsByStars: (state) => {
      return state.students.filter((s) => state.favoriteIds.includes(s.id))
    },
  },
})
