import { print } from "./print.ts";
import { assertEquals } from "@std/assert";

function captureStdout(testFn: () => void): string {
  const originalWrite = Deno.stdout.writeSync;
  let output = "";
  Deno.stdout.writeSync = (data) => {
    output += new TextDecoder().decode(data);
    return data.length;
  };
  try {
    testFn();
  } finally {
    Deno.stdout.writeSync = originalWrite;
  }
  return output;
}

Deno.test("print() outputs to console with default settings", () => {
  const output = captureStdout(() => print("Hello", "World"));
  assertEquals(output, "Hello World\n");
});

Deno.test("print() respects custom separator", () => {
  const output = captureStdout(() => print("A", "B", "C", { sep: "-" }));
  assertEquals(output, "A-B-C\n");
});

Deno.test("print() respects custom end character", () => {
  const output = captureStdout(() => print("Hello", { end: "!!!" }));
  assertEquals(output, "Hello!!!");
});

Deno.test("print() writes to a file (Deno only)", async () => {
  const filePath = "test_output.txt";
  await Deno.remove(filePath).catch(() => {});

  print("File Test", { file: filePath });
  const fileContent = await Deno.readTextFile(filePath);

  assertEquals(fileContent, "File Test\n");
  await Deno.remove(filePath);
});
