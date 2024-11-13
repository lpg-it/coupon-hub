<template>
  <router-link 
    :to="`/category/${props.category.name.toLowerCase()}`"
    class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 cursor-pointer
           group relative overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 
                group-hover:opacity-100 transition-opacity duration-300"/>
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-full flex items-center justify-center"
           :class="categoryColors[props.category.color]">
        <i :class="['fas', props.category.icon, 'text-lg']"></i>
      </div>
      <div>
        <h3 class="font-semibold text-gray-800">{{ props.category.name }}</h3>
        <p class="text-sm text-gray-500">{{ props.category.count }} Coupons</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const categoryColors = {
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
}
</script> 