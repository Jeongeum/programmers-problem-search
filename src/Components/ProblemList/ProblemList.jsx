import React, { forwardRef } from "react";
import { ProblemItem } from "./ProblemItem";
import styled from "styled-components";

const ProblemListWrapper = styled.section`
  height: 665px;
  overflow-x: hidden;
  overflow-y: scroll;
`;
export const ProblemList = React.memo(
  forwardRef(({ filteredProblems }, ref) => {
    console.log("🚀 ProblemList 렌더링", filteredProblems);
    return (
      <ProblemListWrapper>
        <h2 className="ir">문제 리스트</h2>
        <ul>
          {filteredProblems.map((problem) => {
            return <ProblemItem problem={problem} key={problem.id} />;
          })}
        </ul>
      </ProblemListWrapper>
    );
  })
);
