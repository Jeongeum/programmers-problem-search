import React from "react";
import styled from "styled-components";

const ProblemLi = styled.li`
  width: 100%;
  border: 1px solid #d7e2eb;
  border-radius: 10px;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
`;

const ProblemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
`;

const PartTitle = styled.p`
  font-size: 0.8rem;
  color: #7890a0;
`;

const LevelSpan = styled.span`
  font-size: 0.9rem;
`;

export const ProblemItem = ({ problem }) => {
  const { title, partTitle, level } = problem;
  return (
    <ProblemLi>
      <a
        href={`https://school.programmers.co.kr/learn/courses/30/lessons/${problem.id}`}
        target="_black"
      >
        <ProblemTitle>{title}</ProblemTitle>
        <PartTitle>{partTitle}</PartTitle>
      </a>
      <LevelSpan>Lv.{level}</LevelSpan>
    </ProblemLi>
  );
};
