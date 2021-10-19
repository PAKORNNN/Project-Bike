<template>
  <div>
    <article class="col-10 ">
      <!-- col-12 col-md-6 tm-post -->
        <h1 class="text">Bicycle</h1>
      <div class="d-flex justify-content-between">
        <h4><span>bike type {{ blogs.length }}</span></h4>
        <button v-on:click="navigateTo('/blog/create')" class="btn btn-success">
          <i class="fa fa-plus-square" aria-hidden="true"></i> &nbsp; Add Bike
        </button>
      </div>
      <div v-for="blog in blogs" v-bind:key="blog.id">
        <hr class="tm-hr-primary" />
        <a href="" class="effect-lily tm-post-link tm-pt-60">
          <!-- เกี่ยวกับรูป -->
          <div class="tm-post-link-inner">
            <!-- ///////////// -->
            <transition name="fade">
              <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
                <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
              </div>
            </transition>
            <!-- ///////// -->
          </div>
          <span class="position-absolute tm-new-badge">New</span>
          <h2 class="tm-pt-30 tm-color-primary tm-post-title">
            {{ blog.title }}
          </h2>
        </a>

        <p class="tm-pt-30">{{ blog.content }}</p>
        <div class="d-flex justify-content-between tm-pt-45">
          <span class="tm-color-primary">Travel . Events</span>
          <span class="tm-color-primary">June 24, 2020</span>
        </div>
        <hr />

        <div class="d-flex justify-content-between">
          <span>36 comments</span>
          <span>{{ blog.category }}</span>
        </div>

        <p>
          <button
            v-on:click="navigateTo('/blog/' + blog.id)"
            class="btn btn-info"
          >
            <i class="fa fa-search" aria-hidden="true"></i> Check
          </button>
          <button
            v-on:click="navigateTo('/blog/edit/' + blog.id)"
            class="btn btn-warning"
          >
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
          </button>
          <button v-on:click="deleteBlog(blog)" class="btn btn-danger">
            <i class="far fa-trash-alt"></i> Delete
          </button>
        </p>
      </div>
    </article>

    <div class="row tm-row tm-mt-100 tm-mb-75">
      <footer class="row tm-row">
        <div class="center">
          <!-- <div class="row tm-row tm-mt-100 tm-mb-75"> -->
          <!-- <div class="tm-paging-wrapper"> -->

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
        <!-- </div> -->
        <!-- </div> -->

        <hr class="col-12" />
        <div class="col-md-6 col-12 tm-color-gray">
          Design:
          <a
            rel="nofollow"
            target="_parent"
            href="https://templatemo.com"
            class="tm-external-link"
            >TemplateMo</a
          >
        </div>
        <div class="col-md-6 col-12 tm-color-gray tm-copyright">
          Copyright 2020 Xtra Blog Company Co. Ltd.
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import BlogService from "@/services/BlogService";

export default {
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      blog: {
        title: "",
        thumbnail: "null",
        pictures: "null", //pictues
        content: "",
        category: "",
        status: ""
      }
    };
  },
  async created() {
    this.blogs = (await BlogService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login"
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogService.index()).data;
    }
  }
};
</script>
<style scoped>
.a1 {
  display: flex;
  justify-content: center;
}
.isize {
  font-size: 11px;
}
</style>
