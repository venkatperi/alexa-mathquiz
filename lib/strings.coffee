x = ( v ) -> if v? then v else ""

str = ( opts, s ) ->
  opts = {} unless opts?
  "#{x opts.prefix} #{s} #{x opts.postfix}"

question = ( opts ) -> str opts, "Question #{opts.current}: #{opts.q}"

module.exports =
  ok : ( opts ) -> str opts, "Ok. Let's get started."
  type : ( opts ) -> str opts, "Quiz for what?"
  size : ( opts ) -> str opts, "How long?"
  time : ( opts ) -> str opts, "How long should I wait for each answer?"
  mode : ( opts ) -> str opts, "Do you want feedback for each answer?"
  start : ( opts ) -> str opts, "Ok, #{opts.count} questions. Let's start. "
  question : ( opts ) -> str opts, "Question #{opts.current}: #{opts.q}"
  correct : ( opts ) -> str opts, "Correct."
  incorrect : ( opts ) -> str opts, "Oops. The correct answer is #{opts.answer}."
  done : ( opts ) -> str opts, "Ok, that's it. You got #{opts.score} correct out of #{opts.count}."
    

  
