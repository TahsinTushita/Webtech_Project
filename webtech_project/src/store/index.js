import { createStore } from "vuex";
import axios from "axios";
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

axios.defaults.baseURL = "http://localhost:3000";

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
      axios("/api/users").then((res) => {
        commit("SET_USERS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createUser({ commit }, data) {
      axios.post("/api/user/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteUser({ commit }, username) {
      axios.delete("/api/user/delete/" + username).then((res) => {
        console.log(res.data);
        this.dispatch("getUsers");
        this.dispatch("getPets");
        this.dispatch("getHobbies");
        this.dispatch("getTodolist");
        this.dispatch("getBlogs");
      });
    },

    getPets({ commit }) {
      axios.get("/api/pet").then((res) => {
        commit("SET_PETS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createPet({ commit }, data) {
      axios.post("/api/pet/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getPets");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deletePet({ commit }, petId) {
      axios.delete("/api/pet/delete/" + petId).then((res) => {
        console.log(res.data);
        this.dispatch("getPets");
      }),
        (error) => {
          console.log(error);
        };
    },

    updatePet({ commit }, data) {
      axios.put("/api/pet/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getPets");
      }),
        (error) => {
          console.log(error);
        };
    },

    getHobbies({ commit }) {
      axios.get("/api/hobby").then((res) => {
        commit("SET_HOBBIES", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createHobby({ commit }, data) {
      axios.post("/api/hobby/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getHobbies");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteHobby({ commit }, hobbyId) {
      axios.delete("/api/hobby/delete/" + hobbyId).then((res) => {
        console.log(res.data);
        this.dispatch("getHobbies");
      }),
        (error) => {
          console.log(error);
        };
    },

    updateHobby({ commit }, data) {
      axios.put("/api/hobby/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getHobbies");
      }),
        (error) => {
          console.log(error);
        };
    },

    getTodolist({ commit }) {
      axios.get("/api/todo").then((res) => {
        console.log(res.data);
        commit("SET_TODOLIST", res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createTodo({ commit }, data) {
      axios.post("/api/todo/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getTodolist");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteTodo({ commit }, todoId) {
      axios.delete("/api/todo/delete/" + todoId).then((res) => {
        console.log(res.data);
        this.dispatch("getTodolist");
      }),
        (error) => {
          console.log(error);
        };
    },

    updateTodo({ commit }, data) {
      axios.put("/api/todo/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getTodolist");
      }),
        (error) => {
          console.log(error);
        };
    },

    getBlogs({ commit }) {
      axios.get("/api/blog").then((res) => {
        commit("SET_BLOGS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    createBlog({ commit }, data) {
      axios.post("/api/blog/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getBlogs");
        this.dispatch("getUsers");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteBlog({ commit }, blogId) {
      axios.delete("/api/blog/delete/" + blogId).then((res) => {
        console.log(res.data);
        this.dispatch("getBlogs");
      }),
        (error) => {
          console.log(error);
        };
    },

    updateBlog({ commit }, data) {
      axios.put("/api/blog/update", data).then((res) => {
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
