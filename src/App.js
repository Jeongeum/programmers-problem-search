import { useEffect, useState } from "react";
import { Container } from "./Components/Container/Container";
import { ProblemList } from "./Components/ProblemList/ProblemList";
import { Search } from "./Components/Search/Search";

function App() {
  const [problemDatas, setProblemDatas] = useState(null);
  // 데이터 받아오기
  useEffect(() => {
    fetch(
      "https://school.programmers.co.kr/api/v1/school/challenges/?page=1&perPage=20&languages[]=javascript&order=acceptance_desc"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("데이터 가져옴!");
        setProblemDatas(res.result);
      });
  }, []);

  if (problemDatas !== null) {
    return (
      <Container>
        <Search />
        <ProblemList problemDatas={problemDatas} />
      </Container>
    );
  }
}
export default App;
