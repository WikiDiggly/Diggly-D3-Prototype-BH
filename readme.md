# d3.js boilerplate - jquery-ui template

This is a template for using d3.js along with jquery-ui. See
[the master branch of this repository](https://github.com/zmaril/d3.js-boilerplate#how-it-works)
for more information for the template system and philosophy behind
this project.

Click [here for deployed example](http://d3bjquery-ui.herokuapp.com/). 

## Types and purpose of files included 

### HTML

* index.html - This is what your webpage will be serving. 

### Coffeescript/Javascript

* js/index.coffee - The javascript file that tells d3.js what to do
* js/vendor/d3.v2.min.js - Minimized d3.js file. 
* js/vendor/jquery.min.js - Everybody needs a little jQuery
* js/vendor/jquery-ui-1.8.18.custom.min.js - jQuery UI to the rescue. 
* js/vendor/underscore.min.js - Underscore is small and useful. 

### less/CSS

* css/index.less - Simple less file
* css/smoothness - Files needed for jQuery-ui

## Quick start

### Get the right template
* Clone - `git clone git@github.com:zmaril/d3.js-boilerplate.git`
* Rename - `mv d3.js-boilerplate my-ballin-document`
* Checkout - `git checkout basic`
* Clean up - `rm .git` (This gets rid of a bunch of files you won't
  need. Think of it as wiping clean all of the branches of this repo.) 
* Restart - `git init`

### Develop locally
* Move `cd my-ballin-document`
* Host `python -m SimpleHTTPServer` or [pyserve &](https://twitter.com/ZackMaril/status/165258473167261698)
* Navigate to localhost:8000

<<<<<<< HEAD
* [basic](https://github.com/zmaril/d3.js-boilerplate/tree/basic) - only has d3.js installed.
* [jquery-ui](https://github.com/zmaril/d3.js-boilerplate/tree/jquery-ui) - A simple example of how to use jquery-ui to interact
  with d3.js.
* [backbone](https://github.com/zmaril/d3.js-boilerplate/tree/backbone)- Deeplinking d3.js with backbone.
* [bootstrap](https://github.com/zmaril/d3.js-boilerplate/tree/bootstrap) - Pretty pages!
* [dashboard](https://github.com/zmaril/d3.js-boilerplate/tree/dashboard)  - Creating a dashboard with d3.js, bootstrap, and backbone.

## Contributing

Tralfamadore needs more pull requests! 

### Current Major TODOS
* Try to scale MathJax down some. It's huge. Only the SVG components
  are used, so everything else can fall away. _This will be moved to
  the MathJax branch once it gets made. But the files do slow down
  cloning, and thus the point of the project, pretty hard most of the
  time._
* Add in more branches. Ideas: rickshaw, cubism, MathJax - Interactive
  graphics with Latex annotations, crossfilter - How to throw around
  millions of data points, graphene - Customizing graphene,
  investigator - A bootstrap backed website that builds on rickshaw,
  jquery-ui, underscore, and backbone to provide a jumping off point
  for designing your own data investigator.
* Get a better website set up to view all this all pretty like. Use [sandcastle](https://github.com/Khan/sandcastle).

Check each branch for more specific items. 

## License

See each branch for licenses. Unless otherwise licensed, this code is
released into the public domain as is, no warranty attached. 
=======
### Deploy Globally 
* Host - `heroku create my-ballin-document --stack cedar`
* Commit - `git commit -am "Totes my goats"`
* Push - `git push heroku master`

### Current TODOS
* Change example to something cool to attract more people to the
  project.

## License

### Major components:

* d3.js: [License](https://github.com/mbostock/d3/blob/master/LICENSE)
* jQuery/jQuery-ui: MIT/GPL license
* underscore: [License](https://github.com/documentcloud/underscore/blob/master/LICENSE)

### Everything else:

Public domain. 
>>>>>>> jquery-ui
