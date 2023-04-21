import React from "react";
import styled from "styled-components";
import { LevelButton } from "../LevelButton/LevelButton";

const SearchWrapper = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 65%;
  height: 2.5rem;
  border: none;
  border-bottom: 1px solid #d7e2eb;
  margin-right: 1rem;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #0078ff;
  }
`;

const SearchBtn = styled.button`
  width: 55px;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.3rem;
`;
const BtnWrapper = styled.div`
  margin-top: 1.3rem;
`;

export const Search = () => {
  return (
    <SearchWrapper>
      <SearchTitle>프로그래머스 문제 검색 사이트</SearchTitle>
      <form>
        <SearchInput type="text"></SearchInput>
        <SearchBtn>검색</SearchBtn>
      </form>
      <BtnWrapper>
        <LevelButton num={1} />
        <LevelButton num={2} />
        <LevelButton num={3} />
        <LevelButton num={4} />
        <LevelButton num={5} />
      </BtnWrapper>
    </SearchWrapper>
  );
};
