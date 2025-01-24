//https://modularfirebase.web.app/common-use-cases/storage/
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { FIREBASE_CHAVE_SERVER } from "@/constants/keys";
import store from "@/store/index";
import etapa from "@/constants/etapaCompra";
export const app = initializeApp(FIREBASE_CHAVE_SERVER);
export const storage = getStorage(app);
export const storageInst = getStorage(app);
// export const storageMolduras = getStorage(app);
export const storageMolduras = getStorage(app, "gs://photonow-app-molduras");
export const auth = getAuth();
export const db = getFirestore(app);

//Actions
export function getCurrentUser() {
  let user = auth.currentUser;
  if (user !== null) {
    return user;
  } else {
    return null;
  }
}

export async function handleAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("conected firebase");
      //deliveryDataTotem(user);
    } else {
      console.log("disconected firebase");
      //store.commit("totem/setTotem", {});
    }
  });
}

export async function loadPrecos() {
  let totemUID = store.getters["totem/getTotem"].id;
  const precosRef = collection(db, "precos");
  const q = query(precosRef, where("totem_uid", "==", totemUID));
  const querySnapshot = await getDocs(q);
  const array = [];
  await querySnapshot.forEach((snapdoc) => {
    array.push(snapdoc.data());
  });

  store.commit(
    "precos/setPrecos",
    array.sort((a, b) => a.qtde_foto - b.qtde_foto)
  );
}

export async function iniciarCompra(callbackSucesso, callbackErro) {
  try {
    var totem = store.getters["totem/getTotem"];
    var compra = {
      data_hora: Timestamp.fromDate(new Date()),
      valor: 0,
      codigo_gateway_pag: null,
      tipo_foto: null,
      qtde_foto: 0,
      etapa: etapa.TIPO_FOTO,
      keep_alive: Timestamp.fromDate(new Date()),
      aplicar_desconto_id: null,
      totem_id: totem.id,
      code: null,
    };

    console.log("iniciarCompra: ", compra);
    var compraRef = await addDoc(collection(db, "compras"), compra);

    console.log("iniciarCompra depois do addDoc ");
    if (compraRef && compraRef.id) {
      compra.id = compraRef.id;
      totem.compra_atual = compra;
      totem.keep_alive = Timestamp.fromDate(new Date());
      store.commit("totem/setTotem", totem);
      store.commit("compra/setCompra", compra);
      let totemRef = doc(db, "totem", totem.id);
      await setDoc(
        totemRef,
        { compra_atual: compra, keep_alive: totem.keep_alive },
        { merge: true }
      );
      callbackSucesso();
    } else {
      callbackErro();
    }
  } catch (e) {
    console.log("Erro ao iniciar uma compra catch: ", e);
    callbackErro();
  }
}

export async function rebaseCompraAtual() {
  let compraID = store.getters["compra/getCompra"].id;
  let docRef = doc(db, "compras", compraID);
  var docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    store.commit("compra/setCompra", docSnap.data());
  } else {
    console.log("Compra não existe!");
    alert("Erro! compra não existe ");
  }
}

export function setEtapaCompraLocal(payload_etapa) {
  //caso necessario.
  var compra = store.getters["compra/getCompra"];
  compra.etapa = payload_etapa;
  store.commit("compra/setCompra", compra);
}
// new method renovate;
export async function updateCompraInterface(CompraAlterada) {
  //MANTER A SEGURANÇA DE QUE A ALTERAÇÃO SEJA REALMENTE DA COMPRA ATUAL & TOTEM ATUAL;
  const totemID = store.getters["totem/getTotem"].id;
  const compraID = store.getters["compra/getCompra"].id;
  const compraRef = doc(db, "compras", compraID);
  const totemRef = doc(db, "totem", totemID);
  CompraAlterada.keep_alive = Timestamp.fromDate(new Date());
  store.commit("compra/setCompra", CompraAlterada);
  await setDoc(
    totemRef,
    {
      keep_alive: Timestamp.fromDate(new Date()),
      compra_atual: CompraAlterada,
    },
    { merge: true }
  );
  await setDoc(compraRef, CompraAlterada, { merge: true });
  return;
}
export async function setCompra(compra_alterada) {
  const compraRef = doc(db, "compras", compra_alterada.id);
  compra_alterada.keep_alive = Timestamp.fromDate(new Date());
  return await setDoc(compraRef, compra_alterada, { merge: true });
}
export async function setEtapaCompra(_etapa) {
  var compra = store.getters["compra/getCompra"];
  var totem = store.getters["totem/getTotem"];
  compra.etapa = _etapa;
  compra.keep_alive = Timestamp.fromDate(new Date());
  store.commit("compra/setCompra", compra);
  const compraRef = doc(db, "compras", compra.id);
  const totemRef = doc(db, "totem", totem.id);
  await setDoc(
    totemRef,
    {
      keep_alive: Timestamp.fromDate(new Date()),
      compra_atual: compra,
    },
    { merge: true }
  );
  return setDoc(
    compraRef,
    {
      etapa: compra.etapa,
      keep_alive: compra.keep_alive,
    },
    { merge: true }
  );
}

export async function setTypePhotoCompra(_tipo) {
  const compra = store.getters["compra/getCompra"];
  compra.tipo_foto = _tipo;
  store.commit("compra/setCompra", compra);
  const compraRef = doc(db, "compras", compra.id);
  return setDoc(compraRef, { tipo_foto: _tipo }, { merge: true });
}

export async function fastUpdate(compra_completa) {
  const compraRef = doc(db, "compras", compra_completa.id);
  store.commit("compra/setCompra", compra_completa);
  return setDoc(compraRef, compra_completa, { merge: true });
}

export async function removeCodeFirebase() {
  let compra = store.getters["compra/getCompra"];
  if (!compra.code || compra.code == "") {
    return false;
  }
  let referencia = doc(db, "codes", compra.code);
  await deleteDoc(referencia);
}

export async function createCode() {
  const code = geraStringAleatoria(5);
  const referencia = doc(db, "codes", code);
  const snapdoc = await getDoc(referencia);
  let compra = store.getters["compra/getCompra"];
  if (!snapdoc.exists()) {
    compra.code = code;
    await fastUpdate(compra);
    const codePayload = {
      code: code,
      compra_id: compra.id,
      keep_alive: Timestamp.fromDate(new Date()),
    };
    //await setDoc(referencia, { compra_id: compra.id, code: code });
    return await setDoc(referencia, codePayload);
  } else {
    createCode();
  }
}

export async function registrarRibbon(value) {
  const totem = store.getters["totem/getTotem"];
  let resultTotal = totem.contadores.countRibbonTotal + value;
  let resultReduce = totem.contadores.countRibbon - value;
  if (!resultTotal || resultTotal < 0) {
    resultTotal = value;
  }
  if (!resultReduce || resultReduce < 0) {
    resultReduce = 0;
  }
  const refTotem = doc(db, "totem", totem.id);
  await setDoc(
    refTotem,
    {
      contadores: {
        countRibbon: resultReduce,
        countRibbonTotal: resultTotal,
      },
    },
    {
      merge: true,
    }
  );
}

function geraStringAleatoria(tamanho) {
  var stringAleatoria = "";
  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < tamanho; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return stringAleatoria;
}

export async function setQtdValorCompra(_qtde_foto, _valor) {
  const compra = store.getters["compra/getCompra"];
  compra.qtde_foto = _qtde_foto;
  compra.valor = _valor;
  store.commit("compra/setCompra", compra);
  const compraRef = doc(db, "compras", compra.id);
  await setDoc(
    compraRef,
    {
      qtde_foto: _qtde_foto,
      valor: _valor,
    },
    { merge: true }
  );
}

export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
