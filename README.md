# ipp5-token-issuer

~~~~~ sh
npm install e53e04ac/ipp5-token-issuer
~~~~~

~~~~~ mjs
import { Ipp5TokenIssuer } from 'e53e04ac/ipp5-token-issuer';
~~~~~

~~~~~ mermaid
graph LR;
  A(["ipp5-token-issuer"]);
  B0(["async-lock"]);
  B1(["e53e04ac/base"]);
  B2(["e53e04ac/hold"]);
  B3(["joi"]);
  B4(["jsonwebtoken"]);
  B5(["e53e04ac/key-value-storage"]);
  C0(["@types/async-lock"]);
  C1(["@types/jsonwebtoken"]);
  C2(["@types/node"]);
  click B1 href "https://github.com/e53e04ac/base";
  click B2 href "https://github.com/e53e04ac/hold";
  click B5 href "https://github.com/e53e04ac/key-value-storage";
  subgraph "e53e04ac/ipp5-token-issuer";
    A;
  end;
  subgraph "dependencies";
    B0 --import--> A;
    B1 --import--> A;
    B2 --import--> A;
    B3 --import--> A;
    B4 --import--> A;
    B5 --import--> A;
  end;
  subgraph "devDependencies";
    C0 --import--> A;
    C1 --import--> A;
    C2 --import--> A;
  end;
~~~~~
