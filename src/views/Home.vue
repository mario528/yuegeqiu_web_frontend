<template>
  <div class="home-page">
    <nav-header></nav-header>
  </div>
</template>

<script>
// @ is an alias to /src
import navHeader from '@/components/Header'

export default {
  name: 'Home',
  components: {
    navHeader
  }
}
</script>
