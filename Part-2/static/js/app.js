// from data.js
var tableData = data;

// create array of table headers
var headers = Object.keys(tableData[0]);
console.log(headers);

//  create arrays of unique values for keys used for filtering
var dates = [];
var cities = [];
var states = [];
var countries = [];
var shapes = [];

tableData.forEach(function(obj){
    dates.push(obj.datetime);
    cities.push(obj.city);
    states.push(obj.state);
    countries.push(obj.country);
    shapes.push(obj.shape);
})
console.log(dates);
console.log(cities);
console.log(states);
console.log(countries);
console.log(shapes);

function uniqueValues(value, index, self) {
    return self.indexOf(value) === index;
};

var dateList = dates.filter(uniqueValues);
var cityList = cities.filter(uniqueValues);
var stateList = states.filter(uniqueValues);
var countryList = countries.filter(uniqueValues);
var shapeList = shapes.filter(uniqueValues);

// var dateList = [];
// var cityList = [];
// var stateList = [];
// var countryList = [];
// var shapeList = [];

// for (var i=0; i<tableData.length; i++){
//     if (i==0){
//         dateList.push(dates[i]);
//         cityList.push(cities[i]);
//         stateList.push(states[i]);
//         countryList.push(countries[i]);
//         shapeList.push(shapes[i]);
//     }
//     else {
//         dateList.forEach(function(j){
//             if (j!=dates[i]){
//                 dateList.push(dates[i]);
//             };
//         });
//         cityList.forEach(function(j){
//             if (j!=cities[i]){
//                 cityList.push(cities[i]);
//             };
//         });
//         stateList.forEach(function(j){
//             if (j!=states[i]){
//                 stateList.push(states[i]);
//             };
//         });
//         countryList.forEach(function(j){
//             if (j!=countries[i]){
//                 countryList.push(countries[i]);
//             };
//         });
//         shapeList.forEach(function(j){
//             if (j!=shapes[i]){
//                 shapeList.push(shapes[i]);
//             };
//         });
//     }
// };

console.log(dateList);
console.log(cityList);
console.log(stateList);
console.log(countryList);
console.log(shapeList);

// create options for each filter dropdown
drop_date = d3.select("#date");
dateList.forEach(function(val){
    option = drop_date.append("option");
    option.text(val);
    option.attr("value",val);
});
drop_city = d3.select("#city");
cityList.forEach(function(val){
    option = drop_city.append("option");
    option.text(val);
    option.attr("value",val);
});
drop_state = d3.select("#state");
stateList.forEach(function(val){
    option = drop_state.append("option");
    option.text(val);
    option.attr("value",val);
});
drop_country = d3.select("#country");
countryList.forEach(function(val){
    option = drop_country.append("option");
    option.text(val);
    option.attr("value",val);
});
drop_shape = d3.select("#shape");
shapeList.forEach(function(val){
    option = drop_shape.append("option");
    option.text(val);
    option.attr("value",val);
});

// create options for each filter dropdown (alternate)
// var options = drop_date.selectAll("option")
//                     .data(dateList)
//                     .enter()
//                     .append("option")
// options.text(function(d){return d;})
//        .attr("value",function(d){return d;});

var button = d3.select("#filter-btn");

var thead = d3.select("thead");
var tbody = d3.select("tbody");

var trow = thead.append("tr");
headers.forEach(function(header){
    trow.append('th').text(header);
});

tableData.forEach(function(record){
    trow = tbody.append("tr");
    trow.append("td").text(record.datetime);
    trow.append("td").text(record.city);
    trow.append("td").text(record.state);
    trow.append("td").text(record.country);
    trow.append("td").text(record.shape);
    trow.append("td").text(record.durationMinutes);
    trow.append("td").text(record.comments);
});

button.on("click", sighting);

function sighting(){

    d3.select("thead").html("");
    d3.select("tbody").html("");

    var input_date = d3.select("#date").property("value");
    var date = Date.parse(input_date);
    console.log(date);

    var city = d3.select("#city").property("value");
    console.log(city);

    var state = d3.select("#state").property("value");
    console.log(state);

    var country = d3.select("#country").property("value");
    console.log(country);

    var shape = d3.select("#shape").property("value");
    console.log(shape);

    if (input_date == "date") {
        function filter_date(record) {
            return record.datetime;
            // return record.datetime == date;
        };   
    }
    else {
        function filter_date(record) {
            return Date.parse(record.datetime) == date;
            // return record.datetime == date;
        };   
    };
    
    if (city == "city") {
        function filter_city(record) {
            return record.city;
        };
    }
    else {
        function filter_city(record) {
            return record.city == city;
        };
    };

    if (state == "state") {
        function filter_state(record) {
            return record.state;
        };
    }
    else {
        function filter_state(record) {
            return record.state == state;
        };
    };

    if(country == "country") {
        function filter_country(record) {
            return record.country;
        };
    }
    else {
        function filter_country(record) {
            return record.country == country;
        };
    };

    if (shape == "shape") {
        function filter_shape(record) {
            return record.shape;
        };
    }
    else {
        function filter_shape(record) {
            return record.shape == shape;
        };
    };

    var results = [];
    if (input_date == "select date" &
        city == "select city" &
        state == "select state" &
        country == "select country" &
        shape == "select shape")
        {
            results = tableData;
        }
    else {
        results = tableData.filter(filter_date)
        .filter(filter_city)
        .filter(filter_state)
        .filter(filter_country)
        .filter(filter_shape);
    }
    console.log(results);

    var trow = thead.append("tr");
    headers.forEach(function(header){
        trow.append('th').text(header);
    });

    results.forEach(function(result){
        trow = tbody.append("tr");
        trow.append("td").text(result.datetime);
        trow.append("td").text(result.city);
        trow.append("td").text(result.state);
        trow.append("td").text(result.country);
        trow.append("td").text(result.shape);
        trow.append("td").text(result.durationMinutes);
        trow.append("td").text(result.comments);
    });

    // d3.select("table").attr(class)
};

