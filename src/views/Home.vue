<template>
    <!-- <div class="home">
      <div class="left-column">
        <app-logo />
        <greet-message />
        <nav-buttons />
      </div>
      <div class="right-column">
        <home-form />
      </div>
    </div> -->
    <section>
      <navbar></navbar>
    </section>
    <section class="bg-emerald-50">
      <div class="container py-6 mx-auto min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="md:order-1 mb-4 flex flex-col justify-center items-start">
              <app-logo></app-logo>
              <greet-message></greet-message>
              <nav-buttons></nav-buttons>
          </div>
          <div class="md:order-1 mb-4 flex flex-col justify-center items-start">
            <home-form></home-form>
          </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import GreetMessage from '../components/Home/GreetMessage.vue';
  import AppLogo from '../components/Home/AppLogo.vue';
  import NavButtons from '../components/Home/NavButtons.vue';
  import Navbar from "../components/Layouts/Navbar.vue";
  import HomeForm from '../components/Home/Form.vue';
  
  export default {
    components: {
      GreetMessage,
      AppLogo,
      NavButtons,
      HomeForm,
      Navbar,
    },
  };
  </script>
  
  <style scoped>
  /* Add Tailwind CSS styling here */
  </style>
  