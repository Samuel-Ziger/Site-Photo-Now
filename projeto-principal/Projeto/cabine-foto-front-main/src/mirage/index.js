import { createServer } from "miragejs";

export function makeServer({ environment = "development" }) {
  return createServer({
    environment,
    routes() {
      this.namespace = "api";
      this.get("totem-cadastro", () => {
        return {
          totemID: 17,
          name: "totem sul",
        };
      });
      this.passthrough("**");
    },
  });
}
