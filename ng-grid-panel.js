angular.module('ngGridPanel', ['ngAnimate'])
    .directive('gridPanel', ['$animate', '$compile', function($animate, $compile) {
        return {
            restrict: 'AE',
            compile: function(tElement, tAttr) {
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
                var collectionName  = matchArray[2];

                var panel;
                var panelOpenedAfter;
                var panelScope;

                return {
                    pre: function($scope, $element) {
                        angular.extend($scope, {
                            onGridItemClick: _onGridItemClick
                        });

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

                                itemElement.addClass('grid-panel-item-' + i).on('click', function(i, item, maxIndex) {
                                    return function() {
                                        _onGridItemClick(i, item, maxIndex);
                                    };
                                }(i, item, len));

                                $animate.enter(itemElement, $element);

                                $compile(itemElement)(itemScope);
                            }
                        }

                        function _onGridItemClick(index, item, itemsLength) {
                            var gridItem = $element.find('.grid-panel-item-' + index);

                            var gridItemCountInRow = getGridItemCountInRow(gridItem);

                            var gridItemPositionInRow = index % gridItemCountInRow;
                            var lastGridItemIndex = gridItemCountInRow - gridItemPositionInRow - 1 + index;

                            if(lastGridItemIndex >= itemsLength) {
                                lastGridItemIndex = itemsLength - 1;
                            }


                            if(panel && panelOpenedAfter === lastGridItemIndex) {
                                updatePanel();
                            }
                            else {
                                addPanel();
                            }

                            function getGridItemCountInRow(gridItem) {
                                var elementWidth = $element.innerWidth();

                                var gridItemOuterWidth = gridItem.outerWidth(true);

                                return Math.floor(elementWidth / gridItemOuterWidth);
                            }

                            function addPanel() {
                                panelOpenedAfter = lastGridItemIndex;

                                var lastGridItemInRow = $element.find('.grid-panel-item-' + lastGridItemIndex);

                                if(panel) {
                                    $animate.leave(panel);
                                }

                                if(panelScope) {
                                    panelScope.$destroy();
                                }

                                panelScope = $scope.$new();
                                panelScope[iterationVariableName] = item;

                                panel = gridPanelTemplate.clone();

                                $animate.enter(panel, null, lastGridItemInRow);

                                $compile(panel)(panelScope);
                                panelScope.$digest();
                            }

                            function updatePanel() {
                                panelScope[iterationVariableName] = item;
                                panelScope.$digest();
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

                    return gridPanelTemplate;
                }
            }
        };
    }]);