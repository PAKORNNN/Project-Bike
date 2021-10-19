<template>
  <div class="bg">
    <h1 class="text">Create Tenants</h1>
    <br>
    <form v-on:submit.prevent="createComment">
      <span>
        Name :
        <input class="form-control" type="text" v-model="comment.comment" required/>
      </span>
      <!-- <span>Type Bike : <input class="form-control" type="text" v-model="comment.type"></span> -->
      <span>Selected type bike:</span>
      <select v-model="comment.type" class="form-control form-control-lg">
        <option disabled value="">Please select one</option>
        <option>Mountain Bike. จักรยานเสือภูเขา</option>
        <option>Road Bike. จักรยานขับบนถนนทางเรียบ</option>
        <option>Hybrid Bike. จักรยานไฮบริด</option>
        <option>Fixed Gear. จักรยานแข่ง แบบไม่มีเกียร์</option>
        <option>Cyclo Cross Bike. จักรยานแข่ง</option>
        <option>Touring Bike. ขี่ท่องเที่ยวโดยเฉพาะ</option>
        <option>Utility bicycles. จักรยานสำหรับใช้งานทั่วไป</option>
      </select>

      <div class="form-row">
        <div class="form-group col-md-6">
         <span> DateStart :</span>
          <input type="Date" class="form-control" v-model="comment.dateStart" required/>
        </div>
        <div class="form-group col-md-6">
          <span>DateEnd :</span>
          <input type="Date" class="form-control" v-model="comment.dateEnd" required/>
        </div>
      </div>
<hr>
      <div class="rig">
        <button type="submit" class="btn btn-success">
          <i class="fa fa-floppy-o" aria-hidden="true"></i> Save
        </button>
        <router-link :to="{ name: 'comments' }" class="btn btn-light"> 
          <i class="fa fa-backward" aria-hidden="true"></i>
          Back 
        </router-link>
      </div>

    </form>
    <!-- <div>
      <span>Name : {{ comment.comment }}</span
      ><br />
      <span>Type Bike : {{ comment.type }}</span
      ><br />
      <span>DateStart : {{ comment.dateStart }}</span
      ><br />
      <span>DateEnd : {{ comment.dateEnd }}</span>
    </div> -->
  </div>
</template>
<script>
import CommentService from "@/services/CommentsService";

export default {
  data() {
    return {
      comment: {
        comment: "",
        type: "",
        dateStart: "",
        dateEnd: ""
      }
    };
  },
  methods: {
    async createComment() {
      try {
        await CommentService.post(this.comment);
        this.$router.push({
          name: "comments"
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped></style>
