import { ref } from 'vue'

export function useNotification() {
  const message = ref('')
  const type = ref('success')
  const isVisible = ref(false)

  function showNotification(text, notificationType = 'success') {
    message.value = text
    type.value = notificationType
    isVisible.value = true

    setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  return {
    message,
    type,
    isVisible,
    showNotification,
  }
}
