

import { randomUUID } from "crypto";

export const generarID = () => {
    const id =
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID() +
      randomUUID();
    return id.replace(/-/g, "");
  };


