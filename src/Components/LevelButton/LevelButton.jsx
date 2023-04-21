import React from "react";
import styled from "styled-components";

const LevelBtn = styled.button`
  width: 55px;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  background-color: #475c73;
  color: #fff;

  &:focus {
    background-color: #0078ff;
  }
`;
export const LevelButton = ({ num }) => {
  return <LevelBtn>Lv.{num}</LevelBtn>;
};
