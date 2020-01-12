// Assign the data from `data.js` to a descriptive variable
var people = data;

// Select the button
var button = d3.select("#button");

// Complete the click handler for the form
button.on("click", onclick);

// button.on("click", function() {
function onclick(){

  // Clear previous results
  console.clear();
  d3.select("#age_stats").html("");
  d3.select("ul").html("");
  d3.select("#filtered_table").html("");
  d3.select("thead").html("");
  d3.select("tbody").html("");

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#patient-form-input");

  // Get the value property of the input element
  var inputValue = inputElement.property("value").toLowerCase();

  // Use the form input to filter the data by blood type
  function bloodtype(record){
    return record.bloodType.toLowerCase() == inputValue;
  }

  // BONUS: Calculate summary statistics for the age field of the filtered data

  // Create an array with just the age values
  var ages = [];
  
  results = people.filter(bloodtype);

  results.forEach(function(result){
    ages.push(result.age)
  });

  // Use math.js to calculate the mean, median, mode, var, and std of the ages
  var mean_age = math.mean(ages);
  var median_age = math.median(ages);
  var mode_age = math.mode(ages);
  var variance_age = math.var(ages);
  var std_age = math.std(ages);

  // Add age summary stats to the `ul` tag
  var header_stat = d3.select("#age_stats");
  header_stat.append("h4").text("Age Statistics")
  
  var ul = d3.select("ul");
  ul.append("li").text(`Mean: ${mean_age}`);
  ul.append("li").text(`Median: ${median_age}`);
  ul.append("li").text(`Mode: ${mode_age}`);
  ul.append("li").text(`Variance: ${variance_age}`);
  ul.append("li").text(`Standard Deviation: ${std_age}`);

  // Display filtered data as a table
  var table = d3.select("table");
  table.attr("class", "table table-striped");

  var header_table = d3.select("#filtered_table");
  header_table.append("h4").text("Filtered Data Table")

  var thead = d3.select("thead");
  var th_row = thead.append("tr");
  var labels = Object.keys(people[0]);
  console.log(labels);
  
  labels.forEach(function(header){
    theader = th_row.append("th").text(header);
  })

  var tbody = "";
  tbody = d3.select("tbody");

  results.forEach(function(result){
    tb_row = "";
    tb_row = tbody.append("tr");
    td1 = tb_row.append("td").text(result.fullName);
    td2 = tb_row.append("td").text(result.age);
    td3 = tb_row.append("td").text(result.bloodType);
  })
};

// Retrieve entry in case 'enter' is pressed
var inputElement = document.getElementById("patient-form-input");
inputElement.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});