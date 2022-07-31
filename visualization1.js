
//MAP VISUALIZATION

//create SVG
const width = 800;
const height = 600;
const svg = d3.select('#visualization1').attr('width', width).attr('height', height);

//map projection
//scale scales it on the page
//translate can center it on the svg
const projection = d3.geoEqualEarth().scale(150).translate([width/2, height/2]);
const path = d3.geoPath(projection);

//g is a specific svg element that goes into the svg
//g is what the group is called inside of an svg
const countries_group = svg.append('g');

//creates a sequential discrete nine-color scale (using Red-Purple).
//Given a number t in the range [0,1], returns the corresponding color
//from the “RdPu” sequential color scheme represented as an RGB string.
var color_sequential = d3.scaleOrdinal(d3.schemeRdPu[9]);

d3.json('countries-110m.json').then((data) => {
    // if you have topojson instead of geojason
    const countries = topojson.feature(data, data.objects.countries);
    console.log(countries);
    
    countries_group
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        //d is the string that draws the outline, is how you tell the svg to draw the path
        .attr('d', path)
        .attr('stroke-width', 1)
        .on('mouseover', function (d, i) {
            d3.select(this).attr('stroke-width', 3);
        })
        .on('mouseout', function (d, i) {
            d3.select(this).attr('stroke-width', 1);
        })
        ;
} );



