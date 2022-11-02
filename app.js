const form = document.querySelector("#searchForm");
const input = document.querySelector("input");
const btn = document.querySelector(".searchBtn");
const view = document.querySelector(".view");
const ul = document.querySelector(".problemList");
const levelBtn = document.querySelectorAll(".lvBtn");

// 데이터를 담을 problem 배열
let problemArr = [];

// 데이터 받아오기
async function getData() {
  try {
    const response = await fetch(
      "https://school.programmers.co.kr/api/v1/school/challenges/?page=1&perPage=20&languages[]=javascript&order=acceptance_desc"
    );

    const { result: problemList, totalPages } = await response.json();

    for (let i = 2; i <= totalPages; i++) {
      let page = await fetch(
        `https://school.programmers.co.kr/api/v1/school/challenges/?page=${i}&perPage=20&languages[]=javascript&order=acceptance_desc`
      );
      const { result } = await page.json();
      problemList.push(...result);
    }

    problemList.forEach((problem) => {
      ul.append(problemDraw(problem));
    });

    problemArr = [...problemList];
    view.append(ul);
  } catch (e) {
    console.log(e);
  }
}

// 레벨 별로 문제 보여주기
levelBtn.forEach((BtnItem) => {
  BtnItem.addEventListener("click", () => {
    if (input.value) input.value = "";

    const levelProblem = problemArr.filter(
      (problem) => Number(BtnItem.id) === problem.level
    );
    ul.innerHTML = "";
    levelProblem.forEach((levelProblem) => {
      ul.append(problemDraw(levelProblem));
    });
    view.appendChild(ul);
  });
});

// 문제 화면에 띄우기
function problemDraw(problem) {
  const problemLi = document.createElement("li");
  problemLi.classList.add("problemItem");
  problemLi.innerHTML = `
                    <a href="https://school.programmers.co.kr/learn/courses/30/lessons/${problem.id}">
                        <h2 class="problemTitle">${problem.title}</h2>
                        <p class="partTitle">${problem.partTitle}</p>
                    </a>
                    <span class="level">Lv.${problem.level}</span>
                    `;
  return problemLi;
}

// 검색 함수
function searchProblem(e) {
  e.preventDefault();
  // const fragment = new DocumentFragment();  하위트리 조립 후, dom에 트리를 삽입하도록 도와준다.
  const searchValue = new RegExp(input.value); //
  const searchItem = problemArr.filter((problem) =>
    searchValue.test(problem.title)
  );

  /* 기존에 띄워준 ul을 초기화하고 검색한 값을 화면에 띄운다. */
  ul.innerHTML = "";
  searchItem.forEach((searchProblem) => {
    ul.append(problemDraw(searchProblem));
  });
  view.appendChild(ul);
}

form.addEventListener("submit", searchProblem);

getData();
