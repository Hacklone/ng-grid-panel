ngGridPanel
===========

An easy to use grid repeating module with opening panel.

#[Demo](http://hacklone.github.io/ng-grid-panel/)

#How To Use

##Install
```bower install ng-grid-panel```

##Include Script and Style
```html
<link href="bower_components/ng-grid-panel/ng-grid-panel.min.css" rel="stylesheet" type="text/css">

<script src="bower_components/ng-grid-panel/ng-grid-panel.min.js"></script>
```

##Include ngGridPanel
```javascript
angular.module('YourModule', ['ngGridPanel']);
```

##Add html
```html
<grid-panel repeat="item in items" 
            on-panel-opened="panelIsOpened(item)" on-panel-closed="panelIsClosed(item)">
    <grid-panel-item>
        <div>
            Grid item template
            {{ item.name }}
        </div>
    </grid-panel-item>
    <grid-panel-content>
        <div>
            Opening panel template
            Opened: {{ item.name }}
        </div>
    </grid-panel-content>
</grid-panel>
```

#License
> The MIT License (MIT)

> Copyright (c) 2014 Hacklone
> https://github.com/Hacklone

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
