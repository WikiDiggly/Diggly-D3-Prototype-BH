/**
 * Currently this is spaghetti / POC code for Diggly FE interactive piece,
 * This will be broken apart as we begin working on initial beta version.
 */


/**
 * Object for the document actions and behaviors
 * @type {Object}
 */
var docHelper = {
  updateBox: function (description, url, score) {
    $('#description').text(description);
    var formatUrl = '<a href="' + url + '" target="_blank">' + url + '</a>';
    $('#url').html(formatUrl);
    $('#score').text(score);
  }
};

/**
 * Returns the midpoint of the canvas
 * @param  {object} data       The data object tied to the element
 * @param  {string} coordinate Reference to X or Y
 * @return {number}            The value of coordinate to be placed in canvas
 */
var getMidpoint = function (data, coordinate) {
  if (data.index === 0) {
    switch (coordinate) {
      case "x":
        return w/2;
        break;
      case "y":
        return h/2;
        break;
      default:
        console.log("incorrect coordinate, only x or y");
        break;
    }
  } else {
    return data[coordinate];
  }
};

// Start of D3 and the ...
// Big spaghetti code
var sampleData = {
  title: "Solar System",
  url: "http://url.com",
  shortDesc: "asdlad askdjsalkdj aslkdjsalkdj aslkjd lasdlkjasd",
  relevantTopic: [
    {
      title: "Sun",
      url: "http://url.com",
      relevantScore: 0.8,
    },
    {
      title: "Juipter",
      url: "http://url.com",
      relevantScore: 0.20,
    },
    {
      title: "Inner Circles",
      url: "http://url.com",
      relevantScore: 0.50,
    }
  ]
};

var mainNode = {
  title: sampleData.title,
  url: sampleData.url,
  relevantScore: 1
};


var dataset = {
  nodes: sampleData.relevantTopic,
  edges: [
    {
      source: 1,
      target: 0
    },
    {
      source: 2,
      target: 0
    },
    {
      source: 3,
      target: 0
    },
  ]
};

// Move main node upfront
dataset.nodes.unshift(mainNode);

var w = window.innerWidth / 1.4;
var h = window.innerHeight / 1.2;
var linkDistance = 200;
var colors = d3.scale.category10();

// Set Up SVG space
var svg = d3.select('body').append('svg');
svg.attr('width', w);
svg.attr('height', h);

/**
 * Builds the link distance per node
 * @param  {object} link    Links objects being compared in iteration
 * @param  {int} maxDist Maximum distance for each link
 * @return {int}         Relevant link distance base on nodes
 */
var buildLinkDist = function(link, maxDist) {
  // Return the inverse of the distance
  // as it should get closer to the main node
  return Math.abs(1 - (link.source.relevantScore * maxDist));
};


/**
 * Returns the max distance for the canvas
 * @param  {int} dim1 Dimension to compare to
 * @param  {int} dim2 Second Dimension to compare to
 * @return {int}      Maximum distance based on canvas dimensions
 */
var getMaxLength = function(dim1, dim2) {
  var baseDim = (dim1 < dim2) ? dim1 : dim2;

  // Divide by two, as canvas begins in middle of Canvas
  baseDim = baseDim / 2;
  return baseDim;
};

var baseDist = getMaxLength(w, h);

var force = d3.layout.force()
    .nodes(dataset.nodes)
    .links(dataset.edges)
    .size([w - 20,h - 20])
    .linkDistance(function(link) {
      // Needs to be passed in as a callback? not sure why this is the case
      return buildLinkDist(link, baseDist);
    })
    .charge([-500])
    .theta(0.1)
    .gravity(0.05)
    .start();

var edges = svg.selectAll("line")
  .data(dataset.edges)
  .enter()
  .append("line")
  .attr("id",function(d,i) {return 'edge'+i})
  .attr('marker-end','url(#marker_circle)')
  .style("stroke","#ccc")
  .style("pointer-events", "none");

var nodes = svg.selectAll("circle")
  .data(dataset.nodes)
  .enter()
  .append("circle")
  .attr(
  {
    "r": function(d, i) {
      return d.relevantScore * 20;
    },
    "class": "node"
  })
  .style("fill",function(d,i){return colors(i);})
  .call(force.drag)
  .on("click", function(d, i) {
    docHelper.updateBox(d.title, d.url, d.relevantScore)
  });

var nodelabels = svg.selectAll(".nodelabel")
   .data(dataset.nodes)
   .enter()
   .append("text")
   .attr({"x":function(d){return d.x;},
          "y":function(d){return d.y;},
          "class":"nodelabel",
          "stroke":"black"})
   .text(function(d){return d.title;});

var edgepaths = svg.selectAll(".edgepath")
    .data(dataset.edges)
    .enter()
    .append('path')
    .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
           'class':'edgepath',
           'fill-opacity':0,
           'stroke-opacity':0,
           'fill':'blue',
           'stroke':'red',
           'id':function(d,i) {return 'edgepath'+i}})
    .style("pointer-events", "none");

var edgelabels = svg.selectAll(".edgelabel")
    .data(dataset.edges)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr({'class':'edgelabel',
           'id':function(d,i){return 'edgelabel'+i},
           'dx':80,
           'dy':0,
           'font-size':10,
           'fill':'#aaa'});


    edgelabels.append('textPath')
        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
        .style("pointer-events", "none")

    svg.append('defs').append('marker')
        .attr({'id':'arrowhead',
               'viewBox':'-0 -5 10 10',
               'refX':25,
               'refY':0,
               //'markerUnits':'strokeWidth',
               'orient':'auto',
               'markerWidth':10,
               'markerHeight':10,
               'xoverflow':'visible'})
        .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#ccc')
            .attr('stroke','#ccc');

force.on("tick", function(){

    edges.attr({"x1": function(d){return d.source.x;},
                "y1": function(d){return d.source.y;},
                "x2": function(d){return d.target.x;},
                "y2": function(d){return d.target.y;}
    });

    nodes.attr(
      {
        "cx": function (d) { return d.x },
        "cy": function (d) { return d.y }
      }
    );

    nodelabels.attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; });

    edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                       //console.log(d)
                                       return path});


    edgelabels.attr('transform',function(d,i){
        if (d.target.x<d.source.x){
            bbox = this.getBBox();
            rx = bbox.x+bbox.width/2;
            ry = bbox.y+bbox.height/2;
            return 'rotate(180 '+rx+' '+ry+')';
            }
        else {
            return 'rotate(0)';
            }
    });
});


// Not working as intended, need to gracefully move towards center
// 
// force.on("end", function (){
//   nodes.attr(
//   {
//     "cx": function (d) {
//       return getMidpoint(d, "x");
//     },
//     "cy": function (d) {
//       return getMidpoint(d, "y");
//     }
//   });
// });


// svg.selectAll("circle")
//     .data(subtopic)
//     .enter().append('circle')
//     .attr("cx", function(d, i) {
//       return 50 * d[i].relevantScore;
//     })
//     .attr("cy", function(d, i) {
//       return Math.random(0, 450) * d[i].relevantScore;
//     })
//     
