const translaterAuth = (code) => {
  let mensagem = "";
  switch (code) {
    case "auth/email-already-in-use":
      mensagem = "Esse email";
      break;
    default:
      mensagem = code;
  }
  return mensagem;
};
export { translaterAuth };
