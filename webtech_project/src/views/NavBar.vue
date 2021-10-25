<template>
<header>
    <div>
      <nav>
        <ul>
          <!-- <li><router-link to="/">Home</router-link></li>
          <li><router-link to="about">About</router-link></li> -->
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
    export default {
        name: "NavBar",
    };
</script>