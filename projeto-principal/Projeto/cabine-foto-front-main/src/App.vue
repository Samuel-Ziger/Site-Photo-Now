<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
document.addEventListener("contextmenu", (event) => event.preventDefault());
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  font-family: "Rubik", sans-serif;
  margin: 0px;
  padding: 0px;
}
/*
*::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

*::-webkit-scrollbar-track {
  background-color: #fff;
}

*::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 4px solid #fff;
}

*::-webkit-scrollbar-button {
  display: none;
}
*/
</style>
