import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      background-color: #f9fafb;
      font-size: 10px;
    }  

    a {
        text-decoration: none;
        list-style: none;
        color: #000000;
    }

    ol, ul {
      list-style: none;
    }

    button {
      width: 55px;
      padding: 0.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .ir {
	    position: absolute;
	    clip: rect(0 0 0 0);
	    width: 1px;
	    height: 1px;
	    margin: -1px;
	    overflow: hidden;
}
`;

export default GlobalStyles;
