import { useEffect, useState } from "react";
import { Container } from "./Components/Container/Container";
import { ProblemList } from "./Components/ProblemList/ProblemList";
import { Search } from "./Components/Search/Search";

function App() {
  const [problemDatas, setProblemDatas] = useState([]);
  const [level, setLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://school.programmers.co.kr/api/v1/school/challenges/?page=1"
        );

        const { result: problemList, totalPages } = await response.json();

        for (let i = 2; i <= totalPages; i++) {
          let page = await fetch(
            `https://school.programmers.co.kr/api/v1/school/challenges/?page=${i}`
          );
          const { result } = await page.json();
          problemList.push(...result);
        }
        setProblemDatas(problemList);
        setIsLoading(false); // 로딩 끝
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  // 레벨 별로 문제 보여주기
  const onClickLevelChange = (level) => {
    setLevel(level);
  };

  const filteredProblems =
    level === "all"
      ? problemDatas
      : problemDatas.filter((problem) => problem.level === Number(level));

  if (isLoading) {
    // 로딩 중일 때 로딩 스피너 출력
    return (
      <Container>
        <Search onClickLevelChange={onClickLevelChange} />
        <div>Loading...</div>
      </Container>
    );
  } else if (problemDatas !== null) {
    return (
      <Container>
        <Search onClickLevelChange={onClickLevelChange} />
        <ProblemList filteredProblems={filteredProblems} />
      </Container>
    );
  }
}
export default App;
