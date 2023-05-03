import { useEffect, useMemo, useState } from "react";
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
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    console.log("첫 호출!");
    fetchData();
    console.log(
      "✅ fetchData 끝난 후 상태",
      "inView:",
      inView,
      " isLoading:",
      isLoading,
      " page:",
      page,
      " totalPages:",
      totalPages
    );
  }, []);

  useEffect(() => {
    if (inView && !isLoading && page < totalPages) {
      console.log("🎃 무한 스크롤 요청 ");
      console.log(
        "inView:",
        inView,
        " isLoading:",
        isLoading,
        " page:",
        page,
        " totalPages:",
        totalPages
      );
      fetchData();
    }
  }, [inView]);

  const fetchData = () => {
    console.log("📍 fetchData 시작");
    setIsLoading(true); // 로딩 시작
    axios
      .get(
        `https://school.programmers.co.kr/api/v1/school/challenges/?page=${page}`
      )
      .then((res) => {
        const { totalPages } = res.data;
        setTotalPages(totalPages);
        setProblemDatas((prevData) => [...prevData, ...res.data.result]);
        setPage((page) => page + 1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(
    "🗒 상태정리",
    "inView:",
    inView,
    " isLoading:",
    isLoading,
    " page:",
    page,
    " totalPages:",
    totalPages,
    " problemDatas:",
    problemDatas
  );
  // 레벨 별로 문제 보여주기
  const onClickLevelChange = (level) => {
    setLevel(level);
  };

  const filteredProblems = useMemo(() => {
    if (level === "all") {
      return problemDatas;
    }
    return problemDatas.filter((problem) => problem.level === Number(level));
  }, [level, problemDatas]);

  return (
    <Container>
      <Search onClickLevelChange={onClickLevelChange} />
      <ProblemList filteredProblems={filteredProblems} ref={ref} />
      {isLoading && <div>Loading…</div>}
    </Container>
  );
}
export default App;
