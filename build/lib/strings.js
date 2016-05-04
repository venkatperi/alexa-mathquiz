module.exports = {
  help: function() {
    return ["You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?"];
  },
  goodbye: function() {
    return "Goodbye";
  },
  fact: function(fact) {
    return "Here's your space fact: " + fact;
  }
};
