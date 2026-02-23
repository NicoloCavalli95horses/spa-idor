<template>
  <div>
    <h1>Content details</h1>
    <h2>ID: {{ id }}</h2>
    <h2>Label: {{ label }}</h2>
    <h2>Content: {{ content }}</h2>
  </div>
</template>

<script setup>
// ====================
// Import
// ====================
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


// ====================
// Const
// ====================
const route = useRoute();
const id = ref();
const label = ref();
const content = ref();

// ====================
// Functions
// ====================
async function getItemDetail(label, id) {
  const url = `http://localhost:3456/api/images/${label}/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}


// ====================
// Life cycle
// ====================
onMounted( async () => {
  id.value = route.params.id;
  label.value = route.params.label;
  const item = await getItemDetail(label.value, id.value);
  content.value = item.content;
});

</script>
