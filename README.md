# ipp5-token-issuer

~~~~~ sh
npm install e53e04ac/ipp5-token-issuer
~~~~~

~~~~~ mjs
import { Ipp5TokenIssuer } from 'e53e04ac/ipp5-token-issuer';
~~~~~

~~~~~ mermaid
graph RL;
  A(["e53e04ac/ipp5-token-issuer"]);
  subgraph "dependencies";
    B_0(["async-lock"]);
    B_1(["e53e04ac/base"]);
    B_2(["e53e04ac/hold"]);
    B_3(["joi"]);
    B_4(["jsonwebtoken"]);
    B_5(["e53e04ac/key-value-storage"]);
  end;
  subgraph "devDependencies";
    B_6(["@types/async-lock"]);
    B_7(["@types/jsonwebtoken"]);
    B_8(["@types/node"]);
  end;
  A --reference--> B_0;
  A --reference--> B_1;
  A --reference--> B_2;
  A --reference--> B_3;
  A --reference--> B_4;
  A --reference--> B_5;
  A --reference--> B_6;
  A --reference--> B_7;
  A --reference--> B_8;
  click B_0 "https://www.npmjs.org/package/async-lock/v/1.4.0";
  click B_1 "https://github.com/e53e04ac/base/tree/86bc9dc951e32d7e173b8e7bf020b9439d75f8f7";
  click B_2 "https://github.com/e53e04ac/hold/tree/385afd8049a499071f966af24caf970731543db4";
  click B_3 "https://www.npmjs.org/package/joi/v/17.7.1";
  click B_4 "https://www.npmjs.org/package/jsonwebtoken/v/9.0.0";
  click B_5 "https://github.com/e53e04ac/key-value-storage/tree/ae6f96e5d498ee7c655a091e18ee657176ce7088";
  click B_6 "https://www.npmjs.org/package/@types/async-lock/v/1.4.0";
  click B_7 "https://www.npmjs.org/package/@types/jsonwebtoken/v/9.0.1";
  click B_8 "https://www.npmjs.org/package/@types/node/v/18.13.0";
~~~~~

~~~~~ mermaid
graph LR;
  subgraph "e53e04ac/ipp5-token-issuer"
    C0("index.mjs");
    C1("index.d.ts");
  end;
  subgraph "node:crypto"
    D0(["randomUUID"]);
    D1(["webcrypto"]);
  end;
  subgraph "async-lock"
    D2(["default"]);
  end;
  subgraph "joi"
    D3(["default"]);
  end;
  subgraph "jsonwebtoken"
    D4(["default"]);
  end;
  subgraph "base"
    D5(["Base"]);
  end;
  subgraph "hold"
    D6(["hold"]);
    D7(["unwrap"]);
    D8(["Get"]);
    D9(["ValueOrGet"]);
  end;
  subgraph "key-value-storage"
    D10(["KeyValueStorage"]);
  end;
  D0 --import--> C0;
  D1 --import--> C0;
  D2 --import--> C0;
  D3 --import--> C0;
  D4 --import--> C0;
  D5 --import--> C0;
  D6 --import--> C0;
  D7 --import--> C0;
  D2 --import--> C1;
  D3 --import--> C1;
  D5 --import--> C1;
  D8 --import--> C1;
  D9 --import--> C1;
  D10 --import--> C1;
~~~~~
