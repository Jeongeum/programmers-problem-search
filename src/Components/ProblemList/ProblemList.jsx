import React from "react";
import { ProblemItem } from "./ProblemItem";

export const ProblemList = ({ problemDatas }) => {
  console.log(problemDatas);
  return (
    <section>
      <h2 className="ir">문제 리스트</h2>
      <ul>
        {problemDatas.map((problem) => {
          return <ProblemItem problem={problem} key={problem.id} />;
        })}
      </ul>
    </section>
  );
};
