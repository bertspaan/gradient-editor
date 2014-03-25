//Structure/template from https://github.com/gf3/Levenshtein/blob/master/lib/levenshtein.js

(function(root, factory){
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(function(){
      return factory(root);
    });
  } else if (typeof module == 'object' && module && module.exports) {
    module.exports = factory(root);
  } else {
    root.GradientEditor = factory(root);
  }
}(this, function(root){

  var DEFAULT_GRADIENT = {
    stops: [
      {
        color: "rgba(255,0,0,1)",
        position: "0%",
      },
      {
        color: "rgba(0,0,0,1)",
        position: "50%",
      },
      {
        color: "rgba(0,0,255,1)",
        position: "100%",
      }
    ]    
  };
  
  function GradientEditor(container, options) { 
    // Constructor
    if (options.gradient && options.gradient.stops && options.gradient.stops.length > 0) {
      this._gradient = options.gradient;
    } else {
      this._gradient = DEFAULT_GRADIENT;
    }
    
    var element = d3.select('#' + container);
    element.attr('class', 'gradient-editor-container');      
    element.append('div')
        .attr('class', 'gradient-editor-gradient')
        .style('background', this.toCSS());

    element.append('ol')
        .attr('class', 'gradient-editor-stops')
        .selectAll('li')
        .data(this._gradient.stops)
      .enter()
        .append('li')
        .attr('class', 'gradient-editor-stop')
        .style('background-color', function(d) { return d.color; })
        .style('left', function(d) { return d.position; });



  }
  
  GradientEditor.prototype.toImage = function() {
    
  }
  
  GradientEditor.prototype.getGradient = function() {
    return this._gradient;
  }

  GradientEditor.prototype.toCSS = function () {
      var css = 'linear-gradient(to right, ';
      var stops = [];
      this._gradient.stops.forEach(function(stop) {
        var color = stop.color,
            percentage = stop.position; // TODO: check for '%'
        stops.push(color + ' ' + percentage);        
      });
      css += stops.join(', ') + ')';
      return css;
  }

  return GradientEditor;

}));



////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 
// function GradientEditor(container, options) {
//     var gradient,
//         c = {};
// 
//     function init() {
//       if (options.gradient) {
//         gradient = options.gradient;
//       }
//       
//       var element = d3.select('#' + container);
//       element.attr('class', 'gradient-editor-container');      
//       element.append('div')
//           .attr('class', 'gradient-editor-gradient')
//           .style('background', c.toCSS());
//     }
// 
//     c.toCSS = function() {
//       var css = 'linear-gradient(to right, ';
//       var stops = [];
//       gradient.stops.forEach(function(stop) {
//         var color = stop.color,
//             percentage = stop.position; // TODO: check for '%'
//         stops.push(color + ' ' + percentage);        
//       });
//       css += stops.join(', ') + ')';
//       return css;
//     };
//     
//     c.toImage = function() {
//       
//     }
//     
//     c.getGradient = function() {
//       return gradient;
//     }
//         
//     init();
// 
//     return c;
// }
