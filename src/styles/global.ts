import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
    }
`;
