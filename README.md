# [AngularJS](http://angularjs.org/) directives specific to [JQuery UI CSS](http://jqueryui.com/)

***

## Installation

Only the AngularJS and JQuery UI CSS are required.
JQuery JavaScript files are not required.

```javascript
angular.module('myModule', ['components.jquery-ui-css']);
```

### Example


```html
<!doctype html>
<html ng-app="components.jquery-ui-css">
<head>
	<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/themes/eggplant/jquery-ui.css" type="text/css" rel="stylesheet" />	
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js"></script>
	<script src="./components.jqueryui.js"></script>
</head>
<body>
		<tabs>
			<pane heading="Tab 1">
				Lorem ipsum dolor sit amet
			</pane>
			<pane heading="Tab 2">
				Integer ullamcorper rutrum
			</pane>
		</tabs>
```

