<template>
  <div>
    <link rel="stylesheet" href="myProjects/webProject/icofont/css/icofont.min.css">
    <header class="tm-header" id="tm-header">
      <div class="tm-header-wrapper">
        <button class="navbar-toggler" type="button" aria-label="Toggle navigation"> 
          <i class="fas fa-bars"></i> 
        </button>
        <div class="tm-site-header">
                <!-- <div class="mb-3 mx-auto tm-site-logo"><i class="fas fa-bicycle"></i></div>  -->
                <center> 
                   <div class="mb-3 mx-auto tm-site-logo"><i class="fas fa-biking"></i></div>
                  <!-- <img alt="Vue logo" src="../img/icon001.png" width="130"  height="130"> -->           
                <h1 class="text-center">Bike Rental</h1>
                </center>
            </div>
        <nav class="tm-nav" id="tm-nav">
          <ul>
            <li class="tm-nav-item"> 
                <a href="" class="tm-nav-link"> 
                <i class="fas fa-sign-in-alt"></i>
                <router-link :to="{ name: 'login' }" class="tm-nav-link"> <b> Sign in </b> </router-link>
              </a>
            </li>

            <li class="tm-nav-item ">
               <a href="" class="tm-nav-link">
                <i class="fas fa-bicycle" ></i>
                <router-link :to="{ name: 'blogs' }" class="tm-nav-link"> Bicycle </router-link>
              </a>
            </li>

            <li class="tm-nav-item ">
              <a href="" class="tm-nav-link">
                <i class="fas fa-hands-helping"></i>
                <router-link :to="{ name: 'comments' }" class="tm-nav-link"> Rental </router-link>
              </a>
            </li>

            <li class="tm-nav-item ">
              <a href="" class="tm-nav-link">
                <i class="fas fa-users"></i>
                <router-link :to="{ name: 'users' }" class="tm-nav-link"> Users </router-link>
              </a>
            </li>
            <li class="tm-nav-item ">
              <a href="" class="tm-nav-link">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <a v-on:click.prevent="logout" v-on:click="navigateTo('/login')"  class="tm-nav-link">Sign out</a>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>
<script>

import AuthenService from "@/services/AuthenService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users"
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error; //ฟ้อง error ถ้าใส่รหัสผิด หรือรหัสไม่มีอยู่ในคลัง
        this.email = "";
        this.password = "";
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login",
      });
    },
  }
};
</script>
<style scoped>
.error {
  color: red;
}
</style>
