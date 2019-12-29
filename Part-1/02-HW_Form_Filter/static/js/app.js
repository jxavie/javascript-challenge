// Assign the data from `data.js` to a descriptive variable
var people = data;

// Select the button
var button = d3.select("#button");

// Complete the click handler for the form
button.on("click", function() {

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#patient-form-input");

  // Get the value property of the input element
  var inputValue = inputElement.property("value").toLowerCase();

  // Use the form input to filter the data by blood type
  function bloodtype(record){
    return record.bloodType.toLowerCase() == inputValue;
  }

  // BONUS: Calculate summary statistics for the age field of the filtered data

  // First, create an array with just the age values
  var ages = [];
  
  results = data.filter(bloodtype);

  results.forEach(function(result){
    ages.push(result.age)
  });

  // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
  mean_age = math.mean(ages);
  median_age = math.median(ages);
  mode_age = math.mode(ages);
  variance_age = math.var(ages);
  std_age = math.std(ages);

  // Finally, add the summary stats to the `ul` tag
  var ul = d3.select("ul");
  ul.append("li").text(`Mean: ${mean_age}`);
  ul.append("li").text(`Median: ${median_age}`);
  ul.append("li").text(`Mode: ${mode_age}`);
  ul.append("li").text(`Variance: ${variance_age}`);
  ul.append("li").text(`Standard Deviation: ${std_age}`);

});
