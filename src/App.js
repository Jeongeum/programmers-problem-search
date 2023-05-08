import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./Components/Container/Container";
import { ProblemList } from "./Components/ProblemList/ProblemList";
import { Search } from "./Components/Search/Search";
import { PagiNation } from "./Components/PagiNation/PagiNation";
import DebounceValue from "./hooks/useDebounce";

function App() {
  const [problemData, setProblemData] = useState([]);
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
      setProblemData(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // data
  const [page, setPage] = useState(1);
  const limit = 9;
  const offset = (page - 1) * limit;

  const sliceData = (problems) => {
    if (problems) {
      let result = problems.slice(offset, offset + limit);

      return result;
    }
  };

  // 레벨 별로 문제 보여주기
  const onClickLevelChange = (level) => {
    setKeyword("");
    setLevel(level);
  };

  // 문제 검색
  const [keyword, setKeyword] = useState("");

  const printValue = DebounceValue(keyword, 300);

  const onChangeSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Container>
      <Search
        onClickLevelChange={onClickLevelChange}
        onChangeSearch={onChangeSearch}
        keyword={keyword}
      />
      <ProblemList
        data={
          keyword === ""
            ? level === "all"
              ? sliceData(problemData)
              : problemData.filter((problem) => problem.level === Number(level))
            : sliceData(
                problemData.filter((problem) =>
                  problem.title.includes(printValue)
                )
              )
        }
      />
      {isLoading && <div>Loading…</div>}
      <PagiNation
        limit={limit}
        page={page}
        totalProblem={problemData.length}
        setPage={setPage}
      />
    </Container>
  );
}
export default App;
