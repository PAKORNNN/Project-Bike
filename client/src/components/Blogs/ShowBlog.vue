<template>
  <div>
    <!-- <h1>Show Blog</h1> -->
    <transition name="fade"> 
        <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
          <img :src="BASE_URL+blog.thumbnail">
        </div>
    </transition>
    <br>
    <p><strong> Title : {{ blog.title }}</strong></p>
    <p>Name : {{ blog.category }}</p>
    <p>Content : {{ blog.content }}</p>
    <p>
      <button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="btn btn-success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
      <button v-on:click="navigateTo('/blogs')"  class="btn btn-light"> <i class="fa fa-backward" aria-hidden="true"></i> Back</button>
    </p>

  </div>
</template>

<script>
import BlogService from "@/services/BlogService";

export default {
  data() {
    return {
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
        pictures: "null",  //pictues
        content: "",
        category: "",
        status: "",
        },
      }
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;
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
.thumbnail-pic img{
  width: 50%;
}
</style>
