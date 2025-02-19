/**
 * Mimics Python's `print()` function in Deno and the browser.
 *
 * @param {...any} args - The values to print.
 * @param {Object} [kwargs] - Optional keyword arguments.
 * @param {string} [kwargs.sep=" "] - Separator between values.
 * @param {string} [kwargs.end="\n"] - String appended at the end.
 * @param {string|null} [kwargs.file=null] - File path to write output (Deno) or localStorage key (Browser).
 * @param {boolean} [kwargs.flush=false] - Whether to flush the output (no real effect in JS).
 */
export function print(
  ...args: (string | number | boolean | object)[]
): void {
  interface PrintOptions {
    sep?: string;
    end?: string;
    file?: string | null;
    flush?: boolean;
  }

  const defaultOptions: PrintOptions = {
    sep: " ",
    end: "\n",
    file: null,
    flush: false,
  };

  if (
    args.length > 0 && typeof args[args.length - 1] === "object" &&
    !Array.isArray(args[args.length - 1])
  ) {
    const kwargs = args.pop() as PrintOptions;
    Object.assign(defaultOptions, kwargs);
  }

  const output = args.join(defaultOptions.sep) + defaultOptions.end;

  if (typeof Deno !== "undefined") {
    if (defaultOptions.file) {
      Deno.writeTextFileSync(defaultOptions.file, output, { append: true });
    } else {
      Deno.stdout.writeSync(new TextEncoder().encode(output));
    }
  } else if (typeof window !== "undefined") {
    if (defaultOptions.file) {
      localStorage.setItem(
        defaultOptions.file,
        (localStorage.getItem(defaultOptions.file) || "") + output,
      );
    } else {
      console.log(output);
    }
  } else {
    throw new Error(
      "Unsupported environment: Not running in Deno or a browser.",
    );
  }
}
