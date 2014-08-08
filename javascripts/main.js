angular.module('ngGridPanelDemo', ['ngGridPanel'])
    .controller('mainController', ['$scope', function($scope) {
        var colors = ['#444444', '#D1DBBD', '#91AA9D', '#3E606F', '#193441', '#703030', '#2F343B', '#7E827A', '#E3CDA4', '#C77966'];

        $scope.items = [];

        for(var i = 0; i < 150; i++) {
            $scope.items.push({
                name: 'Click me ' + i,
                backgroundColor: generateRandomBackgroundColor()
            });
        }

        function generateRandomBackgroundColor() {
            return colors[Math.round(Math.random() * (colors.length - 1))];
        }
    }]);
