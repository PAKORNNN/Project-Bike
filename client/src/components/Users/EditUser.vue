<template>
  <div>
    <h1 class="text"> Edit User </h1>
      <form v-on:submit = "editUser">
        <span>Name : <input type="text" v-model = "user.name" class="form-control" required></span>
        <span>Lastname : <input type="text" v-model = "user.lastname" class="form-control" required></span>
        <span>Email : <input type="email" v-model = "user.email" class="form-control" required></span>
        <span>Password : <input type="password" v-model = "user.password" class="form-control" required></span>
        <br>
        <p>
          <button type="submit" class="btn btn-success"> <i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
          <button v-on:click="navigateTo('/users')" class="btn btn-light"> <i class="fa fa-backward" aria-hidden="true"></i> Back</button>
        </p>
      </form>
    <!--<hr>
       <div>
        <span>Name : {{user.name}}</span><br>
        <span>Lastname : {{user.lastname}}</span><br>
        <span>Email : {{user.email}}</span><br>
        <span>Password : {{user.password}}</span>
      </div> -->
  </div>
</template>
<script>
import UserService from '@/services/UserService'

export default {
  data (){
    return {
      user: {
        name: '',
        lastname:'',
        email:'',
        password:'',
        status:'active'
      }
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async editUser (){
      try{
        await UserService.put(this.user)
        this.$router.push({
          name: 'users'
        })
      }catch(error){
        console.log(error)
      }
    }
  },async created() {
    try {
      let userId = this.$route.params.userId
      this.user = (await UserService.show(userId)).data
    }catch(error){
      console.log(error)
    }
  },
}

</script>
<style scoped>

</style>
