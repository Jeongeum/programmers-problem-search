import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value); // input에서 입력한 값을 state로 정의한다.

  // 일정 시간이 지난 후에도 이벤트가 발생하지 않는다면 setDevounceValue 함수 실행
  // 즉, 최종 입력 값이 state에 들어간다.
  // 바뀐 최종 값이 return 된다.
  // 일정 시간이 지나기 전에 또 input에 값을 입력하면 기존 debounceValue가 return 된다.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
