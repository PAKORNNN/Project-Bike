<template>
<div class="box1">
  <div class="">
  <section class="form-elegant">
    <mdb-row>
      <mdb-col md="auto">
        <mdb-card>
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5"><strong>Sign in</strong></h3>
            </div>
            
            <form v-on:submit.prevent="onLogin">
              <mdb-input label="Username" type="text" v-model="email" required/>
            <mdb-input label="Password" type="password" v-model="password" containerClass="mb-0" required />
            
            <div class="text-center mb-3">
              <mdb-btn type="submit" gradient="blue" rounded class="btn-block z-depth-1a">Sign in</mdb-btn>
            </div>
            <div class="error" v-if="error">{{error}}</div>
            </form>
            <!-- <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
            <div class="row my-3 d-flex justify-content-center">
              <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon fab icon="facebook" class="blue-text text-center"/></mdb-btn>
              <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon fab icon="twitter" class="blue-text"/></mdb-btn>
              <mdb-btn type="button" color="white" rounded class="z-depth-1a"><mdb-icon fab icon="google-plus" class="blue-text"/></mdb-btn>
            </div> -->
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">Not a member? <a v-on:click="navigateTo('/user/create/')" class="blue-text ml-1"> Sign Up</a></p>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
  </div>
</div>
</template>

<script>
import AuthenService from '@/services/AuthenService'
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbIcon, mdbModal, mdbModalBody, mdbModalFooter } from 'mdbvue';

export default {
   name: 'FormsPage',
    components: {
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      mdbInput,
      mdbBtn,
      mdbIcon,
      mdbModal,
      mdbModalBody,
      mdbModalFooter
    },
  data() {
    return {
      users: [], ////////
      email:'',
      password:'',
      error: null,
      showModal: false
    };
  }, 
//////////////////////////////////////////
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
////////////////////////////////////////

  methods: {
    //////////////////////////
    navigateTo(route) {
      this.$router.push(route);
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    },
    //////////////////////////////
    async onLogin (){
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        });

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'blogs'
        })

      } catch(error) {
        console.log(error);
        this.error = error.response.data.error //ฟ้อง error ถ้าใส่รหัสผิด หรือรหัสไม่มีอยู่ในคลัง
        this.email = ''
        this.password = ''
      }
    },
  },
};
</script>
<style scoped>
  .error {
    color:red;
  }
  .form-elegant .font-small {
    font-size: 0.8rem; }

  .form-elegant .z-depth-1a {
    -webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
    box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25); 
    }

  .form-elegant .z-depth-1-half,
  .form-elegant .btn:hover {
    -webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
    box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15); 
    }
  .box1{
    display: flex;
    justify-content: center;
    position: absolute;
    left: 60%;
    transform: translate(-50%,0);
    align-items: center;

  }
 
</style>
