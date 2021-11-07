<template>
  <div class="wrapper">
    <div><User /></div>
    <div><Pet /></div>
    <div><Hobby /></div>
    <div><TodoList /></div>
    <div><Blog /></div>
  </div>
</template>

<script>
import User from "../components/User.vue";
import Pet from "../components/Pet.vue";
import Hobby from "../components/Hobby.vue";
import TodoList from "../components/TodoList.vue";
import Blog from "../components/Blog.vue";

export default {
  name: "Home",
  components: {
    User,
    Pet,
    Hobby,
    TodoList,
    Blog,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}

.wrapper > div {
  flex: 1 1 150px;
  height: 500px;
  margin: 10px;
  padding: 10px;
}
</style>