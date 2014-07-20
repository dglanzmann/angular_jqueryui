angular.module('components.jquery-ui-css', []).
	directive('tabs', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope, $element) {
				var panes = $scope.panes = [];
				
				$scope.select = function(pane) {
					angular.forEach(panes, function(pane) {
					pane.selected = false;
					});
					pane.selected = true;
				};
				
				this.addPane = function(pane) {
					if (panes.length === 0) {
						$scope.select(pane);
					}
					panes.push(pane);
				};
			},
			template:
				'<div class="ui-tabs ui-widget ui-widget-content ui-corner-all">' +
					'<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">' +
						'<li class="ui-state-default ui-corner-top" ng-repeat="pane in panes" ng-class="{\'ui-tabs-selected ui-state-active\' : pane.selected}">' +
							'<a href="" ng-click="select(pane)"><img ng-src="{{pane.icon}}"> {{pane.heading}}</a>' +
						'</li>' +
					'</ul>' +
					'<div ng-transclude></div>' +
				'</div>',
			replace: true
		};
	}).
	directive('pane', function() {
		return {
			require: '^tabs',
			restrict: 'E',
			transclude: true,
			scope: { 
				heading: '@',
				icon: '@'
			},
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			template:
				'<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" ng-class="{\'ui-tabs-hide\' : !selected}" ng-transclude>' +
				'</div>',
			replace: true
		};
	}).
	directive('accordion', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope, $element) {
				var panes = $scope.panes = [];
				
				this.addPane = function(pane) {
					if (panes.length === 0) {
						pane.selected = true;
					}
					panes.push(pane);
				};
				
				this.togglePane = function(pane) {
					var toggleState = !pane.selected;
					angular.forEach(panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = toggleState;
				};			
			},
			template:
				'<div class="ui-accordion ui-widget ui-helper-reset ui-accordion-icons" ng-transclude>' +
				'</div>',
			replace: true
		};
	}).
	directive('accordionGroup', function() {
		return {
			require: '^accordion',
			restrict: 'E',
			transclude: true,
			scope: {
				heading: '@',
				hide: '@'
			},
			link: function(scope, element, attrs, accordionCtrl) {
				if(!scope.hide) {
					scope.hide = false;
				}
				accordionCtrl.addPane(scope);
				scope.toggle = function() {
					accordionCtrl.togglePane(scope);
				};
			},
			template:
				'<div ng-hide="hide">' +
					'<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" ng-class="{\'ui-tabs-selected ui-state-active\' : selected}">' +
					'<span class="ui-icon ui-icon-triangle-1-e" ng-class="{\'ui-icon-triangle-1-s\' : selected}"></span>' +
					'<a href="" ng-click="toggle()">{{heading}}</a>' +
					'</h3>' +	  
					'<div style="height: 250px;" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" ng-class="{\'ui-accordion-content-active\' : selected}" ng-transclude>' +
					'</div>' +
				'</div>',
			replace: true
		};
	})
	.directive('smallButton', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: { 
				text: '@',
				tooltip: '@',
				iconClass: '@',
				clickEvent: '&',
			},
			link: function(scope, element, attrs, accordionCtrl) {
				scope.active = false;
				scope.clickButton = function() {
					scope.clickEvent();
				};
				scope.hover = function(active) {
					scope.active = active;
				};
			},
			template:
				'<button title="{{ tooltip }}" ng-click="clickButton()" ng-mouseover="hover(true)" ng-mouseout="hover(false)"' +
					' class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" ng-class="{\'ui-state-hover\' : active}">' +
					'<span class="ui-button-icon-primary ui-icon {{ iconClass }}"></span>' +
					'<span class="ui-button-text">{{ text }}</span>' +
				'</button>',
			replace: true
		};
	});  
