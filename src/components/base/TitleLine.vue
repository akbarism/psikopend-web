<template>
  <h2 class="ttl">{{ title ? title : "" }}</h2>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.ttl {
  font-size: 35px;
  font-weight: 600;
}
.ttl::after {
  content: "";
  display: block;
  margin: 5px auto 15px -30px;
  width: 100px;
  border-bottom: 4px solid #4e1874;
}
</style>