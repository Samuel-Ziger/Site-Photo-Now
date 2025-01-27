var apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId;
// measurementId;

if (process.env.VUE_APP_ENV === "production") {
  // PRODUÇÃO
  apiKey = "AIzaSyBlEgFftjgHDznfDiLGxTup9otxIxE6B4U";
  authDomain = "photonow-app.firebaseapp.com";
  projectId = "photonow-app";
  storageBucket = "photonow-app.appspot.com";
  messagingSenderId = "411040390426";
  appId = "1:411040390426:web:f37d5b270e26b11bb5e0a3";
} else {
  // DEV and RELEASE
  apiKey = "AIzaSyCAFGZq9dvOaowq3kO_voqpqbgFVaEjD80";
  authDomain = "temp123-pdiverte.firebaseapp.com";
  projectId = "temp123-pdiverte";
  storageBucket = "temp123-pdiverte.appspot.com";
  messagingSenderId = "1078767152725";
  appId = "1:1078767152725:web:3011233d7838f9400c6edc";
  // measurementId = "G-JWRNLKPVDG";
}

export const FIREBASE_CHAVE_SERVER = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  // measurementId
};
