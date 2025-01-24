<template>
  <div>
    <button
      class="tw-m-3 tw-p-3 tw-px-5 tw-bg-indigo-700 tw-text-white tw-rounded"
      @click="requestAllPhotosMock()"
    >
      Fotos Mock
    </button>
  </div>
</template>

<script>
import { db } from "../../service/firebase";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";

export default {
  data() {
    return {
      compraId: "mockTestDev",
      compras: [],
      fotos: [],
    };
  },
  mounted() {},
  methods: {
    async requestAllPhotosMock() {
      let refCompras = collection(db, `fotos`);
      const q = query(refCompras, where("compra_id", "==", "mockTestDev"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((snapdoc) => {
        this.removerItemDoFirestore(snapdoc);
      });
    },
    async removerItemDoFirestore(snap) {
      let referencia = doc(db, "fotos", snap.id);
      await deleteDoc(referencia)
        .then(() => {
          console.log(snap.id, "REMOVIDO");
        })
        .catch((err) => {
          console.error(snap.id, "ERRO ao remover", err);
        });
    },
    removeItemStore(itemRef) {
      const storage = getStorage();
      const desertRef = ref(storage, itemRef);
      deleteObject(desertRef)
        .then(() => {
          console.log("Item removido com sucesso: ", itemRef);
        })
        .catch((error) => {
          console.log("Error no Item: ", itemRef);
          console.error(error);
        });
    },
    listaAllMock() {
      const storage = getStorage();
      const listRef = ref(storage, "public");
      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            console.log("folder", folderRef);
          });
          res.items.forEach((itemRef) => {
            console.log("item", itemRef);
            // All the items under listRef.
          });
        })
        .catch((error) => {
          console.error(error);
          // Uh-oh, an error occurred!
        });
    },
    removerFotosMock() {},
  },
};
</script>

<style></style>
