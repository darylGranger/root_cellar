<template>
  <div class="container">
    <h2>Current Stock</h2>
    <div class="create-item">
      <input
        type="text"
        id="item-description"
        v-model="item.description"
        placeholder="Put something in the root cellar"
      />
      <input type="number" id="item-quantity" v-model="item.quantity" placeholder="0" />
      <button v-on:click="createItem">Add!</button>
    </div>
    <hr />
    <div class="error" v-if="error">{{ error }}</div>
    <div class="items-container">
      <div
        class="item"
        v-for="item in items"
        v-bind:item="item"
        v-bind:key="item._id"
        v-on:dblclick="deleteItem(item._id)"
      >
        <div>
          <p
            class="created-at"
          >{{ `${item.createdAt.getDate()}/${item.createdAt.getMonth()}/${item.createdAt.getFullYear()}` }}</p>
          <h3>{{ item.description }} - {{ item.quantity }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemService from "../ItemService";

export default {
  name: "ItemComponent",
  data() {
    return {
      items: [],
      error: "",
      item: {
        description: "",
        quantity: 1
      }
    };
  },
  async created() {
    try {
      this.items = await ItemService.getItems();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createItem() {
      await ItemService.insertItem(this.item);
      this.items = await ItemService.getItems();
      (this.item.description = ""), (this.item.quantity = 0);
    },
    async deleteItem(id) {
      await ItemService.deleteItem(id);
      this.items = await ItemService.getItems();
    },
    async editItem() {
      //coming soon
    }
  }
};
</script>


<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.item {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  /* padding: 10px 10px 30px 10px; */
  margin-bottom: 15px;
}

.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 0;
}

input {
  margin-left: 5px;
  margin-right: 5px;
}

input[type="text"] {
  width: 300px;
}

::placeholder {
  color: lightgray;
  font-style: italic;
}

button {
  background: orange;
}
</style>
