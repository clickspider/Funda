<template>
  <house :loading="loading" />
</template>

<script>
import House from "@/components/House.vue";

export default {
  name: "home",
  props: ["loading"],
  inject: ["theme"],
  components: {
    House
  }
};
</script>
