<template>
  <div>
    <h1 class="text">Show User </h1><br>
    <div class="bg">
      <!-- <div class="text">ID :</div> <span>{{ user.id }}</span><br> -->
    <div class="text">Name - Surname</div> <span>{{ user.name }} - {{ user.lastname }}</span><br>
    <div class="text">Email : </div><span>{{ user.email }}</span><br>
    <div class="text">Password : </div><span>{{ user.password }}</span><hr>
    <button v-on:click="navigateTo('/user/edit/' + user.id)" class="btn btn-success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
    <button v-on:click="navigateTo('/users')" class="btn btn-light"> <i class="fa fa-backward" aria-hidden="true"></i> Back</button>
</div>
  </div>
  
</template>
<script>
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UserService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>
