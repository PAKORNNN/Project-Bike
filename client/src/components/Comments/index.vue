<template>
  <div>
      <h1 class="text">Rental Bike</h1>
      <div class="d-flex justify-content-between ">
        <h4><span>Number of tenants : {{ comments.length }}</span></h4>
        <button v-on:click="navigateTo('/comments/create')" class="btn btn-success">
        <i class="fa fa-file-text-o" aria-hidden="true"></i> 
        New Tenants
        </button>
      </div>

    <br>
    <div v-for="comment in comments" v-bind:key="comment.id" class="bg">
      <div class="text">ID Tenants :</div><span> {{ comment.id }}</span>
      <div class="text">Name Tenants :</div><span> {{ comment.comment }}</span>
      <div class="text">Type Bike :</div><span> {{ comment.type }}</span>
      <div class="text">DateStart :</div><span> {{ comment.dateStart }}</span>
      <div class="text">DateEnd :</div><span> {{ comment.dateEnd }}</span>

      <p>
        <hr>
        <button v-on:click="returnComment(comment)" class="btn btn-success"> 
          <i class="fas fa-undo-alt"></i> Return
        </button>

        <button v-on:click="deleteComment(comment)" class="btn btn-warning" > 
          <i class="far fa-window-close"></i> Cancel
        </button>
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
import CommentsService from "@/services/CommentsService";

export default {
  data() {
    return {
      comments: [],
    };
  },
  async created() {
    this.comments = (await CommentsService.index()).data;
  },
  methods :{
    navigateTo(route) {
      this.$router.push(route);
    },
  async deleteComment(comment) {/* ลบ */
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await CommentsService.delete(comment);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
  async returnComment(comment) {/* คืน */
      let result = confirm("Want to return the bike?");
      if (result) {
        try {
          await CommentsService.delete(comment);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.comments = (await CommentsService.index()).data;
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
