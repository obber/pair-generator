$(".input-form-submit").click(function(e) {
  e.preventDefault();

  // reset results
  $(".results").html("");

  var sprints = parseInt($("#sprints").val());
  var students = $("#students").val().split("\n");
  var results;

  // remove any empty lines
  while (students[students.length - 1] === "") {
    students.pop();
  }

  results = makePairs(students);

  while(results.length > sprints) {
    results.pop();
  }

  results.forEach(function(single, index) {
    var $container = $("<div class='result-single'><h3>Sprint " + (index + 1) + "</h3></div>")

    var $pairs = $("<ul></ul>");
    single.forEach(function(pair) {
      $pairs.append($("<li></li>").text(pair));
    });

    var $single = $container.append($pairs);
    $(".results").append($single);
  });
});
