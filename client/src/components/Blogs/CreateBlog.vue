<template>
  <div>
    <h1 class="text">Create Bike</h1>
    <form v-on:submit.prevent="createBlog">
      <!-- <p><strong>Title:</strong> <input type="text" v-model="blog.title" /></p> -->
      
      <p>Title : <input class="form-control" type="text" v-model="blog.title" required/></p>

      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
        </div>
      </transition>

      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
            required
          />
          <!-- <p v-if="isInitial || isSuccess"/> -->
          <p v-if="isInitial">
            Drag your files(s) <br />
            here to begin or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
          <p v-if="isFailed">Upload Failed</p>
        </div>

        <!-- อัพรูป -->
        <div>
          <ul class="pictures">
            <transition-group tag="ul" name="fade" class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img
                style="margin-bottom: 5px"
                :src="BASE_URL + picture.name"
                alt="picture image"/>
              <br>
              <button v-on:click.prevent="delFile(picture)">Delete</button>
      <button v-on:click.prevent="useThumbnail(picture.name)">Thumbnail</button>
            </li>
            </transition-group>
          </ul>
        </div>
      </form>
      <!-- จบอัพรูป -->

      <p>Content:</p>
      <p>
        <vue-ckeditor
          v-model.lazy="blog.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($event)"
        />
      </p>

      <p>
        Author Name: <input class="form-control" type="text" v-model="blog.category" required/>
      </p>
      <p>
        <button class="btn btn-primary" type="submit">
          <i class="fa fa-plus-square-o" aria-hidden="true"></i> 
          Create
        </button>
        <button class="btn btn-light" v-on:click="navigateTo('/blogs')">
          <i class="fa fa-backward" aria-hidden="true"></i>
          Back
        </button>
      </p>
      
    </form>
  </div>
</template>
<script>
import BlogService from "@/services/BlogService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      blog: {
        title: "",
        thumbnail: "null",
        pictures: "null", //ระวังตรงนี้คำผิด
        content: "",
        category: "",
        status: "",
      },
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      //uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [], //รูป
      pictureIndex: 0, //รูป
      config: {
        /* toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "SuperScript"],
        ], */
        height: 300,
      },
    };
  },
  methods: {
    async createBlog() {
      try {
        this.blog.pictures = JSON.stringify(this.pictures); //ดูรายละเอียด
        await BlogService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    created() {
      this.config.toolbar = [
        {},
      ];
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      //reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      //this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      //upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        //Upload image display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      //handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      //append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      //save here
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },
    async delFile(material) {
      let result = confirm("want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };
        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
    },
  }, //จบเมธอด

  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  components: {
    VueCkeditor,
  },
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
/* image display */
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
.thumbnail-pic img {
  width: 200px;
}
</style>
