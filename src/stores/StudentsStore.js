import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    loading: false,
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
  },

  getters: {
    getStudentsById: (state) => {
      return (id) => state.students.find((s) => s.id === id)
    },
  },
})
