<template>
  <form @submit.prevent="handleSubmit">
    <label>Blog:</label>
    <input type="text" required v-model="blog" />
    <label>User name:</label>
    <input type="text" required v-model="username" />

    <div class="submit">
      <button class="submitBtn" @click="createBlog">Create Blog</button>
    </div>

    <div v-if="blogs.length">
        <div v-for="blog in blogs" :key="blog.id">
            <h3> {{ blog.blog }} </h3>
            <h4> {{ blog.username }} </h4>
            <button class="updateBtn" @click="toggleUpdateModal(blog.blog, blog.id)">UPDATE</button>
            <button class="deleteBtn" @click="deleteBlog(blog.id)">DELETE</button>
        </div>
    </div>
    
  </form>

  <div v-if="showUpdateModal">
      <Modal @close="toggleUpdateModal(null,null)">
        <label>Blog:</label>
        <input type="text" v-model="updatedBlog" />
        <button class="updateBtn" @click="updateBlog">update</button>
        <button class="deleteBtn" @click="toggleUpdateModal(null,null)">close</button>
      </Modal>
  </div>

</template>

<script>
import Modal from "./Modal.vue"

export default {
  components: {Modal},
  data() {
    return {
        blog: null,
        username: null,
        tempBlog: null,
        updatedBlog: null,
        blogId: null,
        showUpdateModal: false
    };
  },

  mounted() {
      this.$store.dispatch('getBlogs');
  },

  computed: {
      blogs: {
          get() {
              return this.$store.getters.allBlogs
          }
      }
  },

  methods: {
      createBlog() {
          if(this.blog && this.username) {
              const data = { blog: this.blog, username: this.username }
              this.$store.dispatch('createBlog', data)
              this.blog = null
              this.username = null
          }
      },

      deleteBlog( blogId ) {
          this.$store.dispatch('deleteBlog', blogId)
      },

      toggleUpdateModal(blog, blogId) {
          this.tempBlog = blog
          this.updatedBlog = blog
          this.blogId = blogId
          this.showUpdateModal = !this.showUpdateModal
      },

      updateBlog() {
          if(this.updatedBlog && this.updatedBlog != this.tempBlog) {
              const data = { blog: this.updatedBlog, id: this.blogId }
              this.$store.dispatch('updateBlog', data)
          }
          
          this.toggleUpdateModal(null, null)
      }
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

.submitBtn {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

.deleteBtn {
  background: red;
  border: 0;
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
  margin: 5px;
}

.updateBtn {
  background: orange;
  border: 0;
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
  margin: 5px;
}

.submit {
  text-align: center;
}

.error{
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
