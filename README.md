# ipp5-token-issuer

~~~~~ sh
npm install e53e04ac/ipp5-token-issuer
~~~~~

~~~~~ mjs
import { Ipp5TokenIssuer } from 'ipp5-token-issuer';
~~~~~

~~~~~ mermaid
graph RL;
  A["package.json\npackage-lock.json"];
  subgraph "dependencies";
    B_0(["async-lock"]);
    B_1(["event-emitter"]);
    B_2(["hold"]);
    B_3(["joi"]);
    B_4(["jsonwebtoken"]);
  end;
  subgraph "devDependencies";
    B_5(["@types/async-lock"]);
    B_6(["@types/jsonwebtoken"]);
    B_7(["@types/node"]);
    B_8(["key-value-storage"]);
  end;
  subgraph "github";
    C_1(["e53e04ac/event-emitter\n63f34d0c90cbecf2b424b38c0615e67fd7ba6594"]);
    C_2(["e53e04ac/hold\n050a2db413598fe87670b5b6bd34b804776a3657"]);
    C_8(["e53e04ac/key-value-storage\ndee421384a40ff07dd5f4ed9360feca90ce51034"]);
  end;
  subgraph "npmjs";
    C_0(["async-lock\n1.4.0"]);
    C_3(["joi\n17.8.3"]);
    C_4(["jsonwebtoken\n9.0.0"]);
    C_5(["@types/async-lock\n1.4.0"]);
    C_6(["@types/jsonwebtoken\n9.0.1"]);
    C_7(["@types/node\n18.14.6"]);
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
  B_0 ----> C_0;
  B_1 ----> C_1;
  B_2 ----> C_2;
  B_3 ----> C_3;
  B_4 ----> C_4;
  B_5 ----> C_5;
  B_6 ----> C_6;
  B_7 ----> C_7;
  B_8 ----> C_8;
  click C_0 "https://www.npmjs.com/package/async-lock/v/1.4.0";
  click C_1 "https://github.com/e53e04ac/event-emitter/tree/63f34d0c90cbecf2b424b38c0615e67fd7ba6594";
  click C_2 "https://github.com/e53e04ac/hold/tree/050a2db413598fe87670b5b6bd34b804776a3657";
  click C_3 "https://www.npmjs.com/package/joi/v/17.8.3";
  click C_4 "https://www.npmjs.com/package/jsonwebtoken/v/9.0.0";
  click C_5 "https://www.npmjs.com/package/@types/async-lock/v/1.4.0";
  click C_6 "https://www.npmjs.com/package/@types/jsonwebtoken/v/9.0.1";
  click C_7 "https://www.npmjs.com/package/@types/node/v/18.14.6";
  click C_8 "https://github.com/e53e04ac/key-value-storage/tree/dee421384a40ff07dd5f4ed9360feca90ce51034";
~~~~~

~~~~~ mermaid
graph RL;
  subgraph "e53e04ac/ipp5-token-issuer";
    E_0(["namespace Ipp5TokenIssuer"]);
    E_1(["type Ipp5TokenIssuer"]);
    E_2(["const Ipp5TokenIssuer"]);
  end;
  M["index.d.ts"]
  subgraph "async-lock";
    I_0_0(["default"]);
  end;
  subgraph "joi";
    I_1_0(["default"]);
  end;
  subgraph "event-emitter";
    I_2_0(["EventEmitter"]);
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
  E_2 ----> M;
~~~~~

~~~~~ mermaid
graph RL;
  subgraph "e53e04ac/ipp5-token-issuer";
    E_0(["Ipp5TokenIssuer"]);
  end;
  M["index.mjs"]
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
  subgraph "event-emitter";
    I_4_0(["EventEmitter"]);
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
