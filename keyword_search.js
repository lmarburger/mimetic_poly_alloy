String.prototype.score = function(search) {
  if (search.length == 0 || this.length == 0) { return 0.0; }

  for (var i = search.length; i > 0; i--) {
    var
      subSearch = search.substring(0, i),
      index = this.search(new RegExp("\\b" + subSearch)),
      score = subSearch.length;

    // Boost the score if it matches at the beginning of a word.
    if (index >= 0) {
      score += 1;
    } else {
      index = this.indexOf(subSearch);
    }

    // No match.
    if (index < 0) { continue; }

    // Remove the matched characters and try to match the unmatched search.
    var
      nextSearch = search.substring(i),
      nextString = this.substring(0, index) +
        this.substring(index + subSearch.length),

      remainingScore = nextString.score(nextSearch);

    // Subtract the score of a non-match.
    if (remainingScore <= 0 && nextSearch.length) {
      remainingScore = Math.pow(2, nextSearch.length) * -1;
    }

    // Reduce the value of non-consecutive multiple matches.
    remainingScore *= 0.9;

    return Math.pow(2, score) + remainingScore;
  }

  return 0.0;
};
