# Mimetic Poly-Alloy

A [Quicksilver][]-inspired JavaScript search that favors consecutive matching
characters.

Quicksilver is great to search using acronyms or shorthand. Where it's not a
good fit is searching through lists of keywords.

The basic approach is to compute a score by counting the number of matched
characters, add a point if it matches the start of a word, and return 2 raised
to the power of the score.

    "this is a test".score("test")  // 32

This search was calculated as such: 2<sup>(4 + 1)</sup>.

    "this is a test".score("is")  // 8
    "this is a test".score("hi")  // 4

Here you can see that a match at the start of a word ranks much higher than in
the middle. More examples can be found in the [accompanying tests][tests].

## Note on Patches/Pull Requests
 
* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a future version
  unintentionally.
* Commit.
* Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2010 Larry Marburger. See [LICENSE][] for details.


[Quicksilver]: http://code.google.com/p/rails-oceania/source/browse/#svn/lachiecox/qs_score/trunk
[tests]: http://github.com/lmarburger/mimetic_poly_alloy/blob/master/test/mimetic_poly_alloy_spec.js
[LICENSE]: http://github.com/lmarburger/mimetic_poly_alloy/blob/master/LICENSE
