import { useState, useEffect } from "react";

type ButtonProps = {
  children?: string;
}

export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log(counter);
  }, [counter])

  function increment() {
    setCounter(oldCounter => oldCounter + 1); // 1
    console.log(counter) // 0
  }

  return (
    <button onClick={increment}>
      {counter}
    </button>
  )
}
