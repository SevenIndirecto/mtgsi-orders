<template>
  <div id="app" class="base">
    <div class="control-list">
      <div class="load-form">
        <input
          id="orderID"
          v-model="orderID"
          placeholder="Order ID"
          type="number"
        />
        <button type="button" @click="loadOrders">Load</button>
      </div>
      <div
        v-for="item of items"
        :key="item.id"
        :class="{
          'control-item--processed': item.processed,
          'control-item--price-error': item.priceDiscrepancy,
        }"
        class="control-item"
      >
        <a
          class="control-item__link"
          href="#"
          :title="item.url"
          @click.prevent="openLink(item.url)"
        >
          <strong>{{ item.qty }}</strong> x {{ item.name }} ({{ item.price }})
          {{ item.priceDiscrepancy ? 'Price discrepancy' : '' }}
        </a>
        <label class="control-item__status" :for="`todo${item.id}`">
          <input
            :id="`todo${item.id}`"
            type="checkbox"
            @change="item.processed = !item.processed"
          />
          {{ item.processed ? 'done' : 'todo' }}
        </label>
      </div>
    </div>
    <iframe v-if="src" class="shop-frame" :src="src"></iframe>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      orderID: null,
      src: null,
      items: [],
    };
  },
  methods: {
    openLink(url) {
      this.src = url;
    },
    async loadOrders() {
      if (!this.orderID) {
        return false;
      }
      let orders = await axios.get(`/export-orders?id=${this.orderID}`);
      this.items = Object.values(orders.data).map(item => {
        item.processed = false;
        return item;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.base {
  display: flex;
}

.shop-frame {
  flex: 3;
  min-height: 1000px;
  border: 1px solid black;
}

.load-form {
  display: flex;
  margin-bottom: 0.5em;
}

.control-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 1em;
}
.control-item {
  flex: 1;
  text-align: left;
  padding: 0.5em 0.5em;
  margin-bottom: 0.25em;
  background: aliceblue;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 10px;

  &--processed {
    background: #d6ffd4;
  }

  &--price-error {
    background: indianred;
  }

  &__link {
    flex: 3;
    text-decoration: none;
    color: black;
  }

  &__status {
    cursor: pointer;
    display: flex;
    flex: 1;
    align-items: center;
  }

  &:hover {
    background: #dae0e5;
  }
}
</style>
