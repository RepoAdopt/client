<template>
  <el-form>
    <h1>Sign in</h1>
    <el-form-item label="Email">
      <el-input />
    </el-form-item>
    <el-form-item label="Password">
      <el-input />
    </el-form-item>
    <el-button>Sign in with GitHub</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'LogIn' });
</script>
