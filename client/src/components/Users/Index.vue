<template>
  <div>
    <h1 class="text">Users</h1>

    <div class="d-flex justify-content-between ">
        <span><h4>Number of users {{ users.length }}</h4></span>
      <div class="d-flex">
         <button v-on:click="navigateTo('/user/create/')" class="btn btn-success">
        <i class="fa fa-file-text-o" aria-hidden="true"></i> New User </button>
      </div>
    </div>
  <br>
    <div v-for="user in users" v-bind:key="user.id" class="bg">
      <!-- <div class="text">Id : </div><span>{{ user.id }}</span> -->
      <div class="text">Name - Surname : </div><span>{{ user.name }} - {{ user.lastname }}</span>
      <div class="text">Email : </div><span>{{ user.email }}</span>
      <div class="text">Password : </div><span>{{ user.password }}</span>

      <p>
        <hr/>
        <button v-on:click="navigateTo('/user/' + user.id)" class="btn btn-primary"> <i class="fa fa-search" aria-hidden="true"></i> Check </button>
        <button v-on:click="navigateTo('/user/edit/' + user.id)" class="btn btn-warning"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit </button>
        <button v-on:click="deleteUser(user)" class="btn btn-danger"><i class="far fa-trash-alt"></i> Delete </button>
      </p>
    </div>
    
    <div class="row tm-row tm-mt-100 tm-mb-75">
      <footer class="row tm-row">
        <div class="center">
        <span class="d-inline-block mr-3">Page</span>
        <nav class="tm-paging-nav d-inline-block">
          <ul>
            <li class="tm-paging-item active">
              <a href="#" class="mb-2 tm-btn tm-paging-link">1</a>
            </li>
            <li class="tm-paging-item">
              <a href="#" class="mb-2 tm-btn tm-paging-link">2</a>
            </li>
            <li class="tm-paging-item">
              <a href="#" class="mb-2 tm-btn tm-paging-link">3</a>
            </li>
          </ul>
        </nav>
        </div>


      <hr class="col-12" />
      <div class="col-md-6 col-12 tm-color-gray">
        Design:
        <a rel="nofollow" target="_parent" href="https://templatemo.com"
          class="tm-external-link">TemplateMo</a>
      </div>
      <div class="col-md-6 col-12 tm-color-gray tm-copyright">
        Copyright 2020 Xtra Blog Company Co. Ltd.
      </div>
    </footer>
  </div>
</div>
</template>
<script>
import UsersService from "@/services/UserService";

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("Want To Delete?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
<style scoped>
</style>
