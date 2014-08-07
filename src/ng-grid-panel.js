/**
 * @license ngGridPanel
 * (c) 2014 Hacklone https://github.com/Hacklone
 * License: MIT
 */
angular.module('ngGridPanel', ['ngAnimate'])
    .directive('gridPanel', function($animate, $compile, $window, $document) {
            return {
                restrict: 'AE',
                compile: function(tElement, tAttr) {
                    var windowElement = angular.element($window);
                    var htmlAndBodyElement = angular.element($document).find('html, body');

                    var gridItemTemplate = getGridItemTemplate();
                    var gridPanelTemplate = getGridPanelTemplate();

                    if(!tAttr.repeat) {
                        throw new Error('repeat attribute must be set');
                    }

                    var matchArray = tAttr.repeat.match(/\s?(.*)\sin\s(.*)\s?/);
                    if(!matchArray || matchArray.length < 3) {
                        throw new Error('repeat attribute must be set like repeat="item in items"');
                    }

                    var iterationVariableName = matchArray[1];
                    var collectionName = matchArray[2];

                    var panel;
                    var panelOpenedAfter;
                    var panelScope;

                    return {
                        pre: function($scope, $element) {
                            _init();
                            function _init() {
                                $scope.$watchCollection(collectionName, _onItemsChanged);
                            }

                            function _onItemsChanged(items) {
                                //todo: remove only items that need to be removed
                                $element.empty();

                                for(var i = 0, len = items.length; i < len; i++) {
                                    var itemScope = $scope.$new();
                                    var item = items[i];

                                    itemScope[iterationVariableName] = item;

                                    var itemElement = gridItemTemplate.clone();

                                    itemElement.addClass('grid-panel-item-' + i).on('click', function(i, item) {
                                        return function() {
                                            _onGridItemClick(i, item);
                                        };
                                    }(i, item));

                                    $animate.enter(itemElement, $element);

                                    $compile(itemElement)(itemScope);
                                }
                            }

                            function _onGridItemClick(index, item) {
                                var gridItem = $element.find('.grid-panel-item-' + index);

                                var lastGridItem = getLastGridItem(gridItem);
                                var lastGridItemClass = lastGridItem.attr('class');

                                if(panel && panelOpenedAfter === lastGridItemClass) {
                                    updatePanel();
                                }
                                else {
                                    addPanel();
                                }

                                updateTriangle();

                                scrollToPanel();

                                function getLastGridItem(gridItem) {
                                    var current = gridItem;
                                    var next = gridItem.next();

                                    while(next && current.offset().top === next.offset().top) {
                                        current = next;

                                        next = current.next();
                                    }

                                    return current;
                                }

                                function addPanel() {
                                    panelOpenedAfter = lastGridItemClass;

                                    closePanel();

                                    panelScope = $scope.$new();
                                    panelScope[iterationVariableName] = item;

                                    panel = gridPanelTemplate.clone();

                                    panel.find('.close-x').on('click', closePanel);

                                    $animate.enter(panel, null, lastGridItem);

                                    $compile(panel)(panelScope);
                                    panelScope.$digest();
                                }

                                function updatePanel() {
                                    panelScope[iterationVariableName] = item;
                                    panelScope.$digest();
                                }

                                function closePanel() {
                                    if(panel) {
                                        $animate.leave(panel);
                                        panel = undefined;
                                    }

                                    if(panelScope) {
                                        panelScope.$destroy();
                                        panelScope = undefined;
                                    }

                                    $scope.$digest();
                                }

                                function scrollToPanel() {
                                    if(!panel) {
                                        return;
                                    }

                                    var gridItemOffset = gridItem.offset().top;

                                    if(gridItemOffset > (windowElement.scrollTop() + (windowElement.height() / 2))) {
                                        htmlAndBodyElement.animate({
                                            scrollTop: gridItemOffset - gridItem.outerHeight(true)
                                        }, 500);
                                    }
                                }

                                function updateTriangle() {
                                    if(!panel) {
                                        return;
                                    }

                                    panel.find('.triangle').css({
                                        left: gridItem.position().left + (gridItem.width() / 2)
                                    });
                                }
                            }
                        }
                    };

                    function getGridItemTemplate() {
                        var gridItemTemplate = tElement.find('grid-panel-item, .grid-panel-item').clone();
                        if(!gridItemTemplate.length) {
                            throw new Error('grid-panel-item template must be set');
                        }

                        return gridItemTemplate;
                    }

                    function getGridPanelTemplate() {
                        var gridPanelTemplate = tElement.find('grid-panel-content, .grid-panel-content').clone();
                        if(!gridPanelTemplate.length) {
                            throw new Error('grid-panel-content template must be set');
                        }

                        gridPanelTemplate
                            .prepend(angular.element('<div class="close-x">'))
                            .prepend(angular.element('<div class="triangle">'));

                        return gridPanelTemplate;
                    }
                }
            };
        });