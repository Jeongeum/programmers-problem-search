import { Container } from "./Components/Container/Container";
import { ProblemList } from "./Components/ProblemList/ProblemList";
import { Search } from "./Components/Search/Search";

function App() {
  return (
    <Container>
      <Search />
      <ProblemList />
    </Container>
  );
}
export default App;
