<template>
  <div class="main">
    <Banner v-show="show_banner" @click="show_banner=false" />
    <Preview v-for="i in items" :key="i.id" :item="i" @click="onClick(i)" />
  </div>
</template>

<script setup>
// ====================
// Import
// ====================
import {
  ref,
  onBeforeMount,
} from 'vue';
import { useRouter } from 'vue-router';
import Preview from '../components/preview.vue';
import Banner from '../components/banner.vue';


// ====================
// Consts
// ====================
const items = ref();
const route = useRouter();
const show_banner = ref(false);
const labels = ["red", "blue", "green", "yellow", "pink", "orange"];

// ====================
// Functions
// ====================
async function getData() {
  const url = "http://localhost:3000/api/images";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.map((i,idx) => {
      i.label = labels[idx];
      return i;
    });

  } catch (error) {
    console.error(error.message);
  }
}

function onClick(i) {
  // Critical access-control logic (divergence point as defined by Kim et al. 2023)
  if (i.is_premium) {
    show_banner.value = true;
  } else {
    route.push( {name: 'detail', params: {id: i.id, label: i.label}} );
  }
}

// ====================
// Life cycle
// ====================
onBeforeMount(async () => {
  items.value = await getData();
});

</script>

<style>
.main {
  display: grid;
  width: 100%;
  height: 100%;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
}
</style>
