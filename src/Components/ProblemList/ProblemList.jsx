import React from "react";
import { ProblemItem } from "./ProblemItem";

export const ProblemList = ({ filteredProblems }) => {
  console.log(filteredProblems);
  return (
    <section>
      <h2 className="ir">문제 리스트</h2>
      <ul>
        {filteredProblems.map((problem) => {
          return <ProblemItem problem={problem} key={problem.id} />;
        })}
      </ul>
    </section>
  );
};
