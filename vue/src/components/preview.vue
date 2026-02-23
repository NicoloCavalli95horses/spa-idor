<template>
  <div class="box" :class="{'premium': item.is_premium}" :style="{'background-color': item.label}">
    {{ item.is_premium ? "premium 🔒" : "free" }}
  </div>
</template>

<script setup>
// ====================
// Props
// ====================
defineProps({
  item: Object,
});

</script>

<style>
.box {
  width: 200px;
  height: 200px;
  background-color: greenyellow;
  display: grid;
  place-content: center;
  font-size: 28px;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
}

.box.premium {
  background-color: orangered;
}
</style>