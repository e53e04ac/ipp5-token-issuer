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
  click B_1 "https://github.com/e53e04ac/base/tree/ec922e97d594333727b64f0f4754321480a59c3c";
  click B_2 "https://github.com/e53e04ac/hold/tree/5dd6f94b8ecd94f98219a7afae52320676380c27";
  click B_3 "https://www.npmjs.org/package/joi/v/17.7.1";
  click B_4 "https://www.npmjs.org/package/jsonwebtoken/v/9.0.0";
  click B_5 "https://www.npmjs.org/package/@types/async-lock/v/1.4.0";
  click B_6 "https://www.npmjs.org/package/@types/jsonwebtoken/v/9.0.1";
  click B_7 "https://www.npmjs.org/package/@types/node/v/18.13.0";
  click B_8 "https://github.com/e53e04ac/key-value-storage/tree/3384bf80f73026013c755d24cc0360870aea81c0";
~~~~~

~~~~~ mermaid
graph RL;
  subgraph "e53e04ac/ipp5-token-issuer";
    E_0(["Ipp5TokenIssuer"]);
  end;
  M(["index.mjs"])
  subgraph "node:crypto";
    I_0_0(["randomUUID"]);
    I_0_1(["webcrypto"]);
  end;
  subgraph "async-lock";
    I_1_0(["default"]);
  end;
  subgraph "joi";
    I_2_0(["default"]);
  end;
  subgraph "jsonwebtoken";
    I_3_0(["default"]);
  end;
  subgraph "base";
    I_4_0(["Base"]);
  end;
  subgraph "hold";
    I_5_0(["hold"]);
    I_5_1(["unwrap"]);
  end;
  M ----> I_0_0;
  M ----> I_0_1;
  M ----> I_1_0;
  M ----> I_2_0;
  M ----> I_3_0;
  M ----> I_4_0;
  M ----> I_5_0;
  M ----> I_5_1;
  E_0 ----> M;
~~~~~

~~~~~ mermaid
graph RL;
  subgraph "e53e04ac/ipp5-token-issuer";
    E_0(["type Ipp5TokenIssuer"]);
    E_1(["const Ipp5TokenIssuer"]);
  end;
  M(["index.d.ts"])
  subgraph "async-lock";
    I_0_0(["default"]);
  end;
  subgraph "joi";
    I_1_0(["default"]);
  end;
  subgraph "base";
    I_2_0(["Base"]);
  end;
  subgraph "hold";
    I_3_0(["Get"]);
    I_3_1(["ValueOrGet"]);
  end;
  subgraph "key-value-storage";
    I_4_0(["KeyValueStorage"]);
  end;
  M ----> I_0_0;
  M ----> I_1_0;
  M ----> I_2_0;
  M ----> I_3_0;
  M ----> I_3_1;
  M ----> I_4_0;
  E_0 ----> M;
  E_1 ----> M;
~~~~~
