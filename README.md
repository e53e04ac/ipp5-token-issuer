# ipp5-token-issuer

~~~~~ sh
npm install e53e04ac/ipp5-token-issuer
~~~~~

~~~~~ mjs
import { Ipp5TokenIssuer } from 'e53e04ac/ipp5-token-issuer';
~~~~~

~~~~~ mermaid
graph RL;
  A(["package.json"]);
  subgraph "dependencies";
    B_0(["async-lock"]);
    B_1(["e53e04ac/base"]);
    B_2(["e53e04ac/hold"]);
    B_3(["joi"]);
    B_4(["jsonwebtoken"]);
  end;
  subgraph "devDependencies";
    B_5(["@types/async-lock"]);
    B_6(["@types/jsonwebtoken"]);
    B_7(["@types/node"]);
    B_8(["e53e04ac/key-value-storage"]);
  end;
  A ----> B_0;
  A ----> B_1;
  A ----> B_2;
  A ----> B_3;
  A ----> B_4;
  A ----> B_5;
  A ----> B_6;
  A ----> B_7;
  A ----> B_8;
  click B_0 "https://www.npmjs.org/package/async-lock/v/1.4.0";
  click B_1 "https://github.com/e53e04ac/base/tree/2dc903faf7859d755dd52f7fde706be5170b9a6f";
  click B_2 "https://github.com/e53e04ac/hold/tree/285d028e225a7e75747417c3ed6b1ca0d5f52f6a";
  click B_3 "https://www.npmjs.org/package/joi/v/17.7.1";
  click B_4 "https://www.npmjs.org/package/jsonwebtoken/v/9.0.0";
  click B_5 "https://www.npmjs.org/package/@types/async-lock/v/1.4.0";
  click B_6 "https://www.npmjs.org/package/@types/jsonwebtoken/v/9.0.1";
  click B_7 "https://www.npmjs.org/package/@types/node/v/18.13.0";
  click B_8 "https://github.com/e53e04ac/key-value-storage/tree/aac96bb14624c4984234bd1f36dba5e21efc04e8";
~~~~~

~~~~~ mermaid
graph LR;
  A(["index.mjs"])
  subgraph "node:crypto";
    B_0_0(["randomUUID"]);
    B_0_1(["webcrypto"]);
  end;
  subgraph "async-lock";
    B_1_0(["default"]);
  end;
  subgraph "joi";
    B_2_0(["default"]);
  end;
  subgraph "jsonwebtoken";
    B_3_0(["default"]);
  end;
  subgraph "base";
    B_4_0(["Base"]);
  end;
  subgraph "hold";
    B_5_0(["hold"]);
    B_5_1(["unwrap"]);
  end;
  B_0_0 ----> A;
  B_0_1 ----> A;
  B_1_0 ----> A;
  B_2_0 ----> A;
  B_3_0 ----> A;
  B_4_0 ----> A;
  B_5_0 ----> A;
  B_5_1 ----> A;
~~~~~

~~~~~ mermaid
graph LR;
  A(["index.d.ts"])
  subgraph "async-lock";
    B_0_0(["default"]);
  end;
  subgraph "joi";
    B_1_0(["default"]);
  end;
  subgraph "base";
    B_2_0(["Base"]);
  end;
  subgraph "hold";
    B_3_0(["Get"]);
    B_3_1(["ValueOrGet"]);
  end;
  subgraph "key-value-storage";
    B_4_0(["KeyValueStorage"]);
  end;
  B_0_0 ----> A;
  B_1_0 ----> A;
  B_2_0 ----> A;
  B_3_0 ----> A;
  B_3_1 ----> A;
  B_4_0 ----> A;
~~~~~
