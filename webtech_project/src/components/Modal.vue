<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal">
            <slot>default content</slot>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal(){
            this.$emit("close")
        }
    }
}
</script>

<style scoped>
  .modal{
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
    /* position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%); */
  }

  .backdrop{
    top: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .modal h1 {
      color: #03cfb4;
      border: none;
      padding: 0;
  }

  .modal p {
      font-style: normal;
  }

  .modal .actions {
      text-align: center;
      margin: 30px 0 10px 0;
  }

  .modal .actions a {
      color: #333;
      padding: 8px;
      border: 1px solid #eee;
      border-radius: 4px;
      text-decoration: none;
      margin: 10px;
  }
</style>
