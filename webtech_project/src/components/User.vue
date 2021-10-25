<template>
  <form @submit.prevent="handleSubmit">
    <label>User name:</label>
    <input type="text" required v-model="username" />

    <div class="submit">
      <button class="submitBtn" @click="createUser">Create User</button>
    </div>
    <div v-if="users.length">
        <div v-for="user in users" :key="user.id">
            <h4> {{ user.username }} </h4>
            <button class="deleteBtn" @click="deleteUser(user.username)">delete</button>
        </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: null,
    };
  },

  mounted() {
      this.$store.dispatch('getUsers')
  },

  computed: {
      users: {
          get() {
              return this.$store.getters.allUsers
          }
      }
  },

  methods: {
      createUser() {
          if(this.username) {
              const data = { username: this.username }
              this.$store.dispatch('createUser',data)
              this.username = null
          }
      },

      deleteUser(username) {
          this.$store.dispatch("deleteUser", username)
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
