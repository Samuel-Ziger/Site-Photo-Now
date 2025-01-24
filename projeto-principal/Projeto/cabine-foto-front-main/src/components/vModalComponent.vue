<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card class="pa-4">
      <div>
        {{ getModal.mensagem }}
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    getModal() {
      return this.$store.getters["getModal"];
    },
  },
  methods: {
    close() {
      this.$store.commit("closeModal");
    },
  },
};
</script>

<style></style>
