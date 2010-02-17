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

String.prototype.qsScore = function(abbreviation,offset) {
  offset = offset || 0 // TODO: I think this is unused... remove
 
  if(abbreviation.length == 0) return 0.9
  if(abbreviation.length > this.length) return 0.0

  for (var i = abbreviation.length; i > 0; i--) {
    var sub_abbreviation = abbreviation.substring(0,i)
    var index = this.indexOf(sub_abbreviation)


    if(index < 0) continue;
    if(index + abbreviation.length > this.length + offset) continue;

    var next_string       = this.substring(index+sub_abbreviation.length)
    var next_abbreviation = null

    if(i >= abbreviation.length)
      next_abbreviation = ''
    else
      next_abbreviation = abbreviation.substring(i)
 
    var remaining_score   = next_string.qsScore(next_abbreviation,offset+index)
 
    if (remaining_score > 0) {
      var score = this.length-next_string.length;

      if(index != 0) {
        var j = 0;

        var c = this.charCodeAt(index-1)
        if(c==32 || c == 9) {
          for(var j=(index-2); j >= 0; j--) {
            c = this.charCodeAt(j)
            score -= ((c == 32 || c == 9) ? 1 : 0.15)
          }
        } else {
          score -= index
        }
      }
   
      score += remaining_score * next_string.length
      score /= this.length;
      return score
    }
  }
  return 0.0
}
