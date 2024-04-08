<script setup>
import AppToolBar from "@/components/AppToolBar.vue"
</script>
<template>
  <AppToolBar />
  <v-card rounded="0" flat>
    <nav density="compact" style="border-bottom: 2px solid #DDD;"
      class="bg-white px-12 pa-4 d-flex justify-space-between align-center">
      <h1 class="nav-header-title">Exclusive</h1>
      <ul class="links d-flex justify-center align-center ga-10">
        <li><a href="#">Home</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Sign Up</a></li>
      </ul>
      <div class="actions d-flex justify-center align-center">
        <div class="search-bar d-flex justify-center align-center mx-4 rounded-sm">
          <input type="text" class="custom-input" placeholder="What are you looking for?">
          <v-icon color="grey-darken-2">mdi-magnify</v-icon>
        </div>
        <div class="icons d-flex justify-center align-center ">
          <v-btn icon="mdi-heart-outline" flat></v-btn>
          <v-btn icon="mdi-cart-outline" flat></v-btn>
        </div>
      </div>
    </nav>
  </v-card>
</template>

<style scoped>
.nav-header-title {
  font-size: 24px;
  font-weight: bold;
}

.custom-input {
  width: 211px;
  height: 27px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
}

.search-bar {
  background-color: #EEE;
  padding: 5px 10px;
}
</style>
