cThis repository contains the front-end code for Corsane's new direction. 

### Install Dependencies

Through pagacke.json `npm` is preconfigured to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder, but this is changed through the `.bowerrc` file. Doing so makes it easier to serve the files by a webserver like nginx.*

### Example config

Create file ```/app/config.js``` and add the following

```
angular
    .module('myApp.config', [])
    .constant('config', {
        baseUrl: 'http://your-api.com/'
    });
```

### Run the Application

Because this project uses the [LESS](http://lesscss.org/) CSS pre-processor, we need to compile the style.less file. Do this by typing (from root directory):

```
lessc --no-color app/styles/style.less > app/styles/style.css

OR run the following bash script from project root:

cat css-compile.sh | sh
```

LESS is a prerequsite here, and can be installed with `npm install -g less`. The project is preconfigured with a simple development web server. Serve the application with the following command:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/`.


## Directory Layout

```
.
├── app.js 						--> main application module
├── bower_components/ 			--> sources installed with bower goes here
├── components/ 				--> reusable components
│   ├── login/					--> example of directory structure
│   │   ├── login.directive.js  	--> angularjs directive with controller defining the component
│   │   ├── login.html 		 		--> HTML file marking up the component
│   │   └── login.less 				--> LESS file styling the component
│   ├── navBar/
│   ├── paragraph/
│   └── topicBox/
│
├── index.html 					--> app layout file (the main html template file of the app)
├── styles/ 					--> general styling should go here
│   ├── app.less 					--> main layout and font styling file
│   ├── colors.less 				--> colors should be defined here
│   ├── responsive-utils.less 		--> hide-XX stuff borrowed from bootstrap
│   ├── style.css 					--> [compiled] default stylesheet 
│   └── style.less 					--> all LESS files are imported to this file
└── views/ 						--> the different pages/views of the application
    ├── article/ 					--> example of directory structure
    │   ├── article.html 				--> HTML file marking up the page
    │   └── article.js 					--> contains controller and routing settings for the page
    ├── lab
    ├── landing
    ├── profile
    ├── topic
    └── topics
```