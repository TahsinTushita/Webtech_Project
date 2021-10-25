<template>
  <form @submit.prevent="handleSubmit">
    <label>Hobby:</label>
    <input type="text" required v-model="hobby"/>
    <label>User name:</label>
    <input type="text" required v-model="username"/>

    <div class="submit">
      <button class="submitBtn" @click="createHobby">Create Hobby</button>
    </div>

    <div v-if="hobbies.length">
        <div v-for="hobby in hobbies" :key="hobby.id">
            <h3>{{ hobby.hobby }}</h3>
            <h4>{{ hobby.username }}</h4>
            <button class="deleteBtn" @click="deleteHobby(hobby.id)">DELETE</button>
            <button class="updateBtn" @click="toggleUpdateModal(hobby.hobby, hobby.id)">UPDATE</button>
        </div>
    </div>
  </form>

  <div v-if="showUpdateModal">
      <Modal @close="toggleUpdateModal(null,null)">
        <label>Hobby</label>
        <input type="text" v-model="updatedHobby"/>
        <button class="updateBtn" @click="updateHobby">UPDATE</button>
        <button class="deleteBtn" @click="toggleUpdateModal(null,null)">CLOSE</button>
      </Modal>
  </div>

</template>

<script>
import Modal from "./Modal.vue"

export default {
  components: {
      Modal
  },

  data() {
      return {
          hobby: null,
          username: null,
          showUpdateModal: false,
          updatedHobby: null,
          tempHobby: null,
          hobbyId: null
      }
  },

  mounted() {
      this.$store.dispatch('getHobbies')
  },

  computed: {
      hobbies: {
          get() {
              return this.$store.getters.allHobbies
          }
      }
  },

  methods: {
      createHobby() {
          if(this.hobby && this.username) {
              const data = { hobby: this.hobby, username: this.username }
              this.$store.dispatch('createHobby', data)
              this.hobby = null
              this.username = null
          }
      },

      deleteHobby(hobbyId) {
          this.$store.dispatch('deleteHobby', hobbyId)
      },

      toggleUpdateModal(hobby, hobbyId) {
          this.tempHobby = hobby
          this.updatedHobby = hobby
          this.hobbyId = hobbyId
          this.showUpdateModal = !this.showUpdateModal
      },

      updateHobby() {
          if(this.updatedHobby && this.updatedHobby != this.tempHobby) {
              const data = { hobby: this.updatedHobby, id: this.hobbyId };
              this.$store.dispatch('updateHobby', data);
          }

          this.toggleUpdateModal(null,null);
      }
  }
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
