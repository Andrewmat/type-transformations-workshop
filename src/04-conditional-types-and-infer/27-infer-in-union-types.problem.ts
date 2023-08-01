import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// Não fazer uma branch para cada caso
// ao inves disso, dá pra colocar infer
// múltiplos tipos usando union

type GetParserResult<T> = T extends
  | ((...args: any) => infer Result)
  | { parse: (...args: any) => infer Result }
  | { extract: (...args: any) => infer Result }
  ? Result
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];
