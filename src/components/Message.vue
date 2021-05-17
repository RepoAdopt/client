<template>
  <el-divider v-if="id !== 0"/>
  <div :class="user === currentUser ? 'align-right': ''">
    <h1>{{ user }}</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    id: {
      type: Number,
    },
    message: {
      type: String,
    },
    user: {
      type: String,
    },
    currentUser: {
      type: String,
    }
  },
}
</script>

<style scoped>
.align-right {
  text-align: right;
}
</style>