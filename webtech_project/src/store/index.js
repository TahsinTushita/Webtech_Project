import { createStore } from "vuex";
import axios from "axios";
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

axios.defaults.baseURL = process.env.baseURL;

export default createStore({
  state: {
    users: [],
    pets: [],
    hobbies: [],
    todoList: [],
    blogs: [],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },

    SET_PETS(state, pets) {
      state.pets = pets;
    },

    SET_HOBBIES(state, hobbies) {
      state.hobbies = hobbies;
    },

    SET_TODOLIST(state, todoList) {
      state.todoList = todoList;
    },

    SET_BLOGS(state, blogs) {
      state.blogs = blogs;
    },
  },
  actions: {
    getUsers({ commit }) {
      axios("http://localhost:3000/api/users").then((res) => {
        commit("SET_USERS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createUser({ commit }, data) {
      axios.post("http://localhost:3000/api/user/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteUser({ commit }, username) {
      axios
        .delete("http://localhost:3000/api/user/delete/" + username)
        .then((res) => {
          console.log(res.data);
          this.dispatch("getUsers");
          this.dispatch("getPets");
          this.dispatch("getHobbies");
          this.dispatch("getTodolist");
          this.dispatch("getBlogs");
        });
    },

    getPets({ commit }) {
      axios.get("http://localhost:3000/api/pet").then((res) => {
        commit("SET_PETS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createPet({ commit }, data) {
      axios.post("http://localhost:3000/api/pet/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getPets");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deletePet({ commit }, petId) {
      axios
        .delete("http://localhost:3000/api/pet/delete/" + petId)
        .then((res) => {
          console.log(res.data);
          this.dispatch("getPets");
        }),
        (error) => {
          console.log(error);
        };
    },

    updatePet({ commit }, data) {
      axios.put("http://localhost:3000/api/pet/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getPets");
      }),
        (error) => {
          console.log(error);
        };
    },

    getHobbies({ commit }) {
      axios.get("http://localhost:3000/api/hobby").then((res) => {
        commit("SET_HOBBIES", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createHobby({ commit }, data) {
      axios.post("http://localhost:3000/api/hobby/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getHobbies");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteHobby({ commit }, hobbyId) {
      axios
        .delete("http://localhost:3000/api/hobby/delete/" + hobbyId)
        .then((res) => {
          console.log(res.data);
          this.dispatch("getHobbies");
        }),
        (error) => {
          console.log(error);
        };
    },

    updateHobby({ commit }, data) {
      axios.put("http://localhost:3000/api/hobby/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getHobbies");
      }),
        (error) => {
          console.log(error);
        };
    },

    getTodolist({ commit }) {
      axios.get("http://localhost:3000/api/todo").then((res) => {
        console.log(res.data);
        commit("SET_TODOLIST", res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createTodo({ commit }, data) {
      axios.post("http://localhost:3000/api/todo/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getTodolist");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteTodo({ commit }, todoId) {
      axios
        .delete("http://localhost:3000/api/todo/delete/" + todoId)
        .then((res) => {
          console.log(res.data);
          this.dispatch("getTodolist");
        }),
        (error) => {
          console.log(error);
        };
    },

    updateTodo({ commit }, data) {
      axios.put("http://localhost:3000/api/todo/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getTodolist");
      }),
        (error) => {
          console.log(error);
        };
    },

    getBlogs({ commit }) {
      axios.get("http://localhost:3000/api/blog").then((res) => {
        commit("SET_BLOGS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createBlog({ commit }, data) {
      axios.post("http://localhost:3000/api/blog/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getBlogs");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteBlog({ commit }, blogId) {
      axios
        .delete("http://localhost:3000/api/blog/delete/" + blogId)
        .then((res) => {
          console.log(res.data);
          this.dispatch("getBlogs");
        }),
        (error) => {
          console.log(error);
        };
    },

    updateBlog({ commit }, data) {
      axios.put("http://localhost:3000/api/blog/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getBlogs");
      }),
        (error) => {
          console.log(error);
        };
    },
  },
  getters: {
    allUsers: (state) => {
      return state.users;
    },

    allPets: (state) => {
      return state.pets;
    },

    allHobbies: (state) => {
      return state.hobbies;
    },

    allTodos: (state) => {
      return state.todoList;
    },

    allBlogs: (state) => {
      return state.blogs;
    },
  },
  modules: {},
});
