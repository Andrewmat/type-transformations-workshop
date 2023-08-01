import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

/*
Okay, essa é complicada.
Quando mando uma union "apple" | "banana" para um generic,
O generic transforma em dois types diferentes:
* "apple"
* "banana"
Mas quando eu não uso generic, ele é um type só "apple" | "generic".
Pra iterar como se fosse dois types, usar um `extends infer XYZ`
*/

// type AppleOrBanana = Extract<Fruit, "apple" | "banana">;

type AppleOrBanana = Fruit extends infer F
  ? F extends "apple" | "banana"
    ? F
    : never
  : never;

type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
