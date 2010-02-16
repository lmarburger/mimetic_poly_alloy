module("search");

test("No match", function() {
  equals("test".score("asdf"), 0.0, "No match");
  equals("test".score(""), 0.0, "Empty search");
  equals("".score("asdf"), 0.0, "Empty input");
});

test("Match the beginning of a word", function() {
  var input = "this is a test";

  // Really long match.
  equals(input.score("this is a test"), 32768.0,
    "14-character match");

  // 4 matching characters.
  equals(input.score("test"), 32.0, "4-character match");
  equals(input.score("thit"), 19.6,
    "3-character and 1-character matches");
  equals(input.score("thte"), 15.2, "2 2-character matches");
  equals(input.score("teth"), 15.2, "2 2-character matches");
  equals(input.score("tiat"), 13.756, "4 1-character matches");

  // 4 matching characters.
  equals(input.score("th"), 8.0, "2-character match");
  equals(input.score("ti"), 7.6, "2 1-character matches");
});

test("Match the middle of a word", function() {
  var input = "this is a test";

  equals(input.score("hi"), 4.0, "2-character match");
  equals(input.score("he"), 3.8, "2 1-character matches");
});

test("Mixed match", function() {
  var input = "this is a test";

  equals(input.score("testx"), 30.2,
         "4-character match and 1-character non-match");
  equals(input.score("testxx"), 28.4,
         "4-character match and 2-character non-match");
  equals(input.score("testxxxx"), 17.6,
         "4-character match and 4-character non-match");
});
