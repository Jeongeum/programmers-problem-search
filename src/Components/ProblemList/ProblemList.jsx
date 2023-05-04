import React from "react";
import { ProblemItem } from "./ProblemItem";
import styled from "styled-components";

const ProblemListWrapper = styled.section`
  height: 650px;
  overflow-x: hidden;
  overflow-y: scroll;
`;
export const ProblemList = React.memo(({ data }) => {
  return (
    <ProblemListWrapper>
      <h2 className="ir">문제 리스트</h2>
      <ul>
        {data.map((problem) => {
          return <ProblemItem problem={problem} key={problem.id} />;
        })}
      </ul>
    </ProblemListWrapper>
  );
});
