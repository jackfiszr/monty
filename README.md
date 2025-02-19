# monty

Python-inspired utilities for JavaScript & TypeScript.

## `print` Function

```ts
print(...objects: any[], options?: {
    sep?: string;
    end?: string;
    file?: string | null;
    flush?: boolean;
}): void
```

Prints the given `objects` as strings, separated by `sep` (default: space) and
ending with `end` (default: newline). In Deno, it writes to `stdout` or a
specified file, while in browsers, it logs to `console` or saves to
`localStorage`.

### Examples

```ts
print("Hello", "World"); // Hello World\n
print("A", "B", "C", { sep: "-" }); // A-B-C\n
print("No newline", { end: "" }); // No newline

print("Log to file", { file: "log.txt" }); // (Deno) Appends to log.txt

print("Save to storage", { file: "log" }); // (Browser) Saves to localStorage
```
