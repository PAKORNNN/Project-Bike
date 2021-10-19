<template>
  <div class="bg">
    <h1 class="text">Create User</h1>
    <form v-on:submit.prevent="createUser">
      <div>
        <span>Name :</span>
        <input class="form-control" type="text" v-model="user.name" required/>
      </div>
      <div>
        <span>Lastname : </span
        ><input class="form-control" type="text" v-model="user.lastname" required/>
      </div>
      <div>
        <span>Email :</span>
        <input class="form-control" type="text" v-model="user.email" required/>
      </div>
      <span>Password :</span>
      <input type="password" class="form-control" v-model="user.password" required/>
      <small class="form-text text-muted">
        Your password must be 8-20 characters long.
      </small>

      <div class="rig">
          <button class="btn btn-primary" type="submit">
            <i class="fa fa-plus-square-o" aria-hidden="true"></i>
            Create
          </button>
          <router-link :to="{ name: 'users' }" class="btn btn-light"> 
            <i class="fa fa-backward" aria-hidden="true"></i>
            Back 
          </router-link>
      </div>
      
    </form>
    <!-- <hr>
      <div>
        <div>name : {{user.name}}</div>
        <div>lastname : {{user.lastname}}</div>
        <div>email : {{user.email}}</div>
        <div>password : {{user.password}}</div>
      </div> -->
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active"
      }
    };
  },
  methods: {
    async createUser() {
      try {
        await UserService.post(this.user);
        this.$router.push({
          name: "login"
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped></style>
