<template>
  <form @submit.prevent="handleSubmit">
    <label>Todo:</label>
    <input type="text" required v-model="todo"/>
    <label>User name:</label>
    <input type="text" required v-model="username"/>

    <div class="submit">
      <button class="submitBtn" @click="addTodo">Add Todo</button>
    </div>

    <div v-if="todoList.length">
        <div v-for="todo in todoList" :key="todo.id">
            <h3>{{ todo.todo }}</h3>
            <h4>{{ todo.username }}</h4>
            <button class="deleteBtn" @click="deleteTodo(todo.id)">DELETE</button>
            <button class="updateBtn" @click="toggleUpdateModal(todo.todo, todo.id)">UPDATE</button>
        </div>
    </div>
  </form>

  <div v-if="showUpdateModal">
      <Modal @close="toggleUpdateModal(null,null)">
          <label>Todo</label>
          <input type="text" v-model="updatedTodo"/>
          <button class="updateBtn" @click="updateTodo">UPDATE</button>
          <button class="deleteBtn" @click="toggleUpdateModal(null,null)">CLOSE</button>
      </Modal>
  </div>

</template>

<script>
import Modal from "./Modal.vue"

export default {
    components: { Modal },

    data() {
        return {
            todo: null,
            username: null,
            showUpdateModal: false,
            tempTodo: null,
            updatedTodo: null,
            todoId: null
        }
    },

    mounted() {
        this.$store.dispatch('getTodolist')
    },

    computed: {
        todoList: {
            get() {
                return this.$store.getters.allTodos
            }
        }
    },

    methods: {
        addTodo() {
            if(this.todo && this.username) {
                const data = { todo: this.todo, username: this.username }
                this.$store.dispatch('createTodo', data)
                this.todo = null
                this.username = null
            } 
        },

        deleteTodo(todoId) {
            this.$store.dispatch('deleteTodo', todoId)
        },

        toggleUpdateModal(todo, todoId) {
            this.tempTodo = todo
            this.updatedTodo = todo
            this.todoId = todoId
            this.showUpdateModal = !this.showUpdateModal
        },

        updateTodo() {
            if(this.updatedTodo && this.updatedTodo != this.tempTodo) {
                const data = { todo: this.updatedTodo, id: this.todoId }
                this.$store.dispatch('updateTodo', data)
            }

            this.toggleUpdateModal(null,null)
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
