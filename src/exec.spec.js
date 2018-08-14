const { resolveSubstitutions, exec } = require("./exec");

describe("exec", () => {
  describe("resolveSubstitutions", () => {
    describe("returns the input if", () => {
      it("no substutions are provided", () => {
        const input = "cmd do something";
        expect(resolveSubstitutions(input)).toEqual(input);
      });

      it("placeholder, but no sub", () => {
        const input = "cmd do $SOMETHING$";
        expect(resolveSubstitutions(input)).toEqual(input);
      });

      it("substution but no placeholder", () => {
        const input = "cmd do SOMETHING";
        expect(resolveSubstitutions(input, { something: "else" })).toEqual(
          input
        );
      });

      it("substutions are lower case", () => {
        const input = "cmd do $something$";
        expect(resolveSubstitutions(input, { something: "else" })).toEqual(
          input
        );
      });
    });

    describe("inserts the substutions", () => {
      it("single sub", () => {
        const input = "cmd do $SOMETHING$";
        expect(resolveSubstitutions(input, { something: "else" })).toEqual(
          "cmd do else"
        );
      });

      it("multiple sub", () => {
        const input = "cmd do $FIRST$ $SECOND$ $THIRD$";
        expect(
          resolveSubstitutions(input, { first: "a", second: "b", third: "c" })
        ).toEqual("cmd do a b c");
      });

      it("supports chaining", () => {
        const input = "cmd do $FIRST$ $SECOND$ $THIRD$";
        expect(
          resolveSubstitutions(input, { first: "$THIRD$", second: "$THIRD$", third: "c" })
        ).toEqual("cmd do c c c");
      })
    });
  });
});
