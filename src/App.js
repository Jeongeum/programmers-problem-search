import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./Components/Container/Container";
import { ProblemList } from "./Components/ProblemList/ProblemList";
import { Search } from "./Components/Search/Search";
import { useInView } from "react-intersection-observer";

function App() {
  const [page, setPage] = useState(1);
  const [problemDatas, setProblemDatas] = useState([]);
  const [level, setLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView();
  const [totalPages, setTotalPages] = useState(30);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && !isLoading && page < totalPages) {
      console.log(inView, "무한 스크롤 요청 🎃");
      fetchData();
    }
  }, [inView, isLoading, page, totalPages]);

  const fetchData = async () => {
    setIsLoading(true); // 로딩 시작
    const response = await axios.get(
      "https://school.programmers.co.kr/api/v1/school/challenges/",
      {
        params: {
          page,
        },
      }
    );
    const newData = response.data.result;
    setTotalPages(response.data.totalPages);

    if (newData.length === 0) {
      setIsLoading(false); //  마지막 페이지에 도달하면 로딩 끝
      return;
    }
    setProblemDatas((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
    console.log(page, totalPages);
  };

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
      <ProblemList filteredProblems={filteredProblems} ref={ref} />
      {isLoading && <div>Loading…</div>}
    </Container>
  );
}
export default App;
