// from data.js
var tableData = data;

// YOUR CODE HERE!
var button = d3.select("#filter-btn");

var tbody = d3.select("tbody");

button.on("click", function(){
    
    var inputElement = d3.select("#datetime");
    var inputValue = Date.parse(inputElement.property("value"));
    console.log(inputValue);

    function filter_date(record) {
        return Date.parse(record.datetime) == inputValue;
    }

    var results = tableData.filter(filter_date);
    console.log(results);

    results.forEach(function(result){
        trow = tbody.append("tr");
        trow.append("td").text(result.datetime);
        trow.append("td").text(result.city);
        trow.append("td").text(result.state);
        trow.append("td").text(result.country);
        trow.append("td").text(result.shape);
        trow.append("td").text(result.durationMinutes);
        trow.append("td").text(result.comments);
    })
})

