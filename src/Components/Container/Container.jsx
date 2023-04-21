import React from "react";
import styled from "styled-components";

const ContWrapper = styled.div`
  width: 600px;
  height: 900px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 20px auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #d7e2eb;
  border-radius: 20px;
`;

export const Container = ({ children }) => {
  return <ContWrapper>{children}</ContWrapper>;
};
