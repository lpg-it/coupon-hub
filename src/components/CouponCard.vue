<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <!-- Brand Logo -->
      <div class="relative w-16 h-16 flex-shrink-0">
        <img 
          :src="coupon.brand.logo" 
          class="w-full h-full object-contain rounded-lg"
          :alt="coupon.brand.name"
        />
      </div>
      
      <!-- Coupon Info -->
      <div class="flex-1 text-center sm:text-left">
        <h3 class="font-bold text-lg text-gray-800">{{ coupon.brand.name }}</h3>
        <p class="text-emerald-600 font-semibold text-xl">{{ coupon.discount }}</p>
      </div>
    </div>

    <!-- Description -->
    <p class="mt-4 text-gray-600 line-clamp-2 min-h-[3rem]">{{ coupon.description }}</p>

    <!-- Code and Expiry -->
    <div class="mt-4 space-y-3">
      <div class="relative">
        <div class="bg-gray-100 rounded-lg p-3 text-center blur-sm">XXXX-XXXX-XXXX</div>
        <a 
          :href="getBrandUrl()"
          target="_blank"
          @click="handleShowCode"
          class="absolute inset-0 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg
                 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300
                 flex items-center justify-center gap-2"
        >
          <i class="fas fa-unlock-alt"></i>
          Get Code & Visit Store
        </a>
      </div>
      
      <!-- Expiry Date -->
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Expires:</span>
        <span>{{ coupon.expiryDate }}</span>
      </div>
    </div>
  </div>

  <!-- Code Modal -->
  <Teleport to="body">
    <div 
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all"
        @click.stop
      >
        <div class="text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Your Coupon Code</h3>
          <div class="bg-blue-50 rounded-lg p-4 mb-4">
            <p class="font-mono text-2xl font-bold text-blue-600 select-all">
              {{ coupon.code }}
            </p>
          </div>
          <p class="text-gray-600 mb-6">{{ coupon.description }}</p>
          <div class="flex flex-col gap-4">
            <button 
              @click="copyCode"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors
                     flex items-center justify-center gap-2"
            >
              <i class="fas fa-copy"></i>
              Copy Code
            </button>
            <button 
              @click="closeModal"
              class="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg 
                     hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const props = defineProps({
  coupon: {
    type: Object,
    required: true
  }
})

const showModal = ref(false)

const getBrandUrl = () => {
  return props.coupon.brand.website || `https://${props.coupon.brand.name.toLowerCase()}.com`
}

const handleShowCode = () => {
  // 延迟显示模态框，让用户有时间看到新窗口打开
  setTimeout(() => {
    showModal.value = true
  }, 500)
}

const closeModal = () => {
  showModal.value = false
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.coupon.code)
    toast.success('Code copied to clipboard!')
  } catch (error) {
    toast.error('Copy failed, please copy manually')
  }
}
</script> 