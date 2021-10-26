<template>
  <form @submit.prevent="handleSubmit">
    <label>Pet name:</label>
    <input class="petName" type="text" required v-model="pet" />
    <label>User name:</label>
    <input class="pet_username" type="text" required v-model="username" />

    <div class="submit">
      <button class="submitBtnPet" @click="adoptPet">Adopt Pet</button>
    </div>
    <div v-if="pets.length">
        <div v-for="pet in pets" :key="pet.id">
            <h3> {{ pet.pet }} </h3>
            <h4>{{ pet.username }} </h4>
            <button class="deleteBtnPet" @click="deletePet(pet.id)">delete</button>
            <button class="updateBtn" @click="toggleUpdateModal(pet.pet,pet.id)">update</button>
        </div>
    </div>
  </form>
  
  <div v-if="showUpdateModal">
      <Modal @close="toggleUpdateModal(null,null)">
        <label>Pet name:</label>
        <input type="text" v-model="updatedPet" />
        <button class="updateBtn" @click="updatePet">update</button>
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
      pet: null,
      tempPet: null,
      updatedPet: null,
      petId: null,
      username: null,
      showUpdateModal: false
    };
  },

  mounted() {
      this.$store.dispatch('getPets')
  },

  computed: {
      pets: {
          get() {
              return this.$store.getters.allPets
          }
      }
  },

  methods: {
      adoptPet() {
         if(this.pet && this.username) {
            const data = { pet: this.pet, username: this.username }
            this.$store.dispatch('createPet',data)
            this.pet = null
            this.username = null
         }
      },

      deletePet(petId) {
          this.$store.dispatch("deletePet", petId)
      },

      toggleUpdateModal(pet,petId) {
          this.tempPet = pet
          this.updatedPet = pet
          this.petId = petId
          this.showUpdateModal = !this.showUpdateModal
      },

      updatePet() {
        if(this.updatedPet && this.updatedPet != this.tempPet) {
          const data = { pet: this.updatedPet, id: this.petId}
          this.$store.dispatch('updatePet', data)
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

.submitBtnPet {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

.deleteBtnPet {
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

.petName{
  text-decoration: none;
}

.pet_username{
  text-decoration: none;
}


</style>
