$(".input-form-submit").click(function(e) {
  e.preventDefault();

  // put up the spinner

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

  makePost(results);

  while(results.length > sprints) {
    results.pop();
  }

  results.forEach(function(single, index) {
    var $container = $("<div class='result-single'><h3 class='result-single-title'><i class=\"icon-rocket\"></i>Sprint " + (index + 1) + "</h3></div>")

    var $pairs = $("<table></table>");
    single.forEach(function(pair) {
      var $cell1 = $("<td></td>").text(pair[0]);
      var $cell2 = $("<td></td>").text(pair[1]);
      var $row = $("<tr></tr>").append($cell1, $cell2);
      $pairs.append($row);
    });

    var $single = $container.append($pairs);
    $(".results").append($single);
  });
});

var makePost = function(data) {
  $.ajax('/txt/create', {
    method: 'POST', 
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(resp) {
      console.log("successful response heard! resp = ", resp);
      var txtUrl = '/txt/' + resp.id;
      $(".txtfile").append($("<p class='url-field'><a target='_blank' href='" + txtUrl + "'>" + txtUrl.slice(1) + "</a></p>"));
      showElements();
    },
    error: function(err) {
      console.error("unsuccessful response. err = ", err);
    }
  })
}

var showElements = function() {
  $(".txtfile-container").show();
  $(".results").show();
  $("html, body").animate({ scrollTop: $('.txtfile-container').offset().top - 40 }, 700);
}
