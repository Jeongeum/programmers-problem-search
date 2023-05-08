import React, { useState } from "react";
import styled from "styled-components";

const PagiNationSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.div``;

const PageBtn = styled.button`
  border-radius: 0;

  &[aria-current] {
    font-weight: bold;
    background-color: #d1d0d0;
  }
`;
export const PagiNation = ({ limit, page, totalProblem, setPage }) => {
  const numPages = Math.ceil(totalProblem / limit); // 몇개의 페이지가 필요한지
  const [currPage, setCurrPage] = useState(page); // 현재 페이지
  let firstNum = currPage - (currPage % 5) + 1; // 페이지네이션에서 첫 숫자
  let lastNum = currPage - (currPage % 5) + 5; // 페이지네이션에서 마지막 숫자

  return (
    <PagiNationSection>
      <BtnWrapper>
        <PageBtn
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </PageBtn>
        <PageBtn
          onClick={() => setPage(firstNum)}
          aria-current={page === firstNum ? "page" : null}
        >
          {firstNum}
        </PageBtn>
        {Array(4)
          .fill()
          .map((_, i) => {
            if (i <= 2) {
              return (
                <PageBtn
                  border="true"
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i);
                  }}
                  aria-current={page === firstNum + 1 + i ? "page" : null}
                >
                  {firstNum + 1 + i}
                </PageBtn>
              );
            } else if (i >= 3) {
              return (
                <PageBtn
                  border="true"
                  key={i + 1}
                  onClick={() => setPage(lastNum)}
                  aria-current={page === lastNum ? "page" : null}
                >
                  {lastNum}
                </PageBtn>
              );
            }
          })}
        <PageBtn
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </PageBtn>
      </BtnWrapper>
    </PagiNationSection>
  );
};
