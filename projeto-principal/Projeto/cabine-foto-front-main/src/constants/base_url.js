const mobileURLProduction = "bit.ly/app-photonow"; // https://mobile.photonow.com.br/code
const mobileURLDefault = "bit.ly/photo-now-app"; // https://mobile.release.photonow.com.br/code
const baseURL =
  process.env.VUE_APP_ENV === "production"
    ? "https://mobile.photonow.com.br/"
    : "https://mobile.release.photonow.com.br/";

export { mobileURLProduction, mobileURLDefault, baseURL };
