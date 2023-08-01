import { Equal, Expect } from "../helpers/type-utils";

const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// type InferPropsFromServerSideFunction<T> = T extends (
//   ...args: any[]
// ) => infer Result
//   ? Awaited<Result> extends { props: infer Props }
//     ? Props
//     : never
//   : never;

/*
Não utilizar infer pra "descascar" cada layer do extends
Ao invés disso, lembrar de diminuir o máximo o "slot"
que o infer é utilizado
*/

type InferPropsFromServerSideFunction<T> = T extends (
  ...args: any[]
) => Promise<{ props: infer Props }>
  ? Props
  : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];
