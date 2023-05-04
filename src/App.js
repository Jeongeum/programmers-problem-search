import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./Components/Container/Container";
import { ProblemList } from "./Components/ProblemList/ProblemList";
import { Search } from "./Components/Search/Search";

function App() {
  const [problemDatas, setProblemDatas] = useState([]);
  const [level, setLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://school.programmers.co.kr/api/v1/school/challenges/"
      );
      const totalPages = res.data.totalPages;
      const results = [];
      for (let i = 1; i <= totalPages; i++) {
        const pageRes = await axios.get(
          `https://school.programmers.co.kr/api/v1/school/challenges/?page=${i}`
        );
        results.push(...pageRes.data.result);
      }
      setProblemDatas(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log("첫 호출!");
    fetchData();
  }, []);

  // 레벨 별로 문제 보여주기
  const onClickLevelChange = (level) => {
    setLevel(level);
  };

  const filteredProblems =
    level === "all"
      ? problemDatas
      : problemDatas.filter((problem) => problem.level === Number(level));

  return (
    <Container>
      <Search onClickLevelChange={onClickLevelChange} />
      <ProblemList filteredProblems={filteredProblems} />
      {isLoading && <div>Loading…</div>}
    </Container>
  );
}
export default App;
