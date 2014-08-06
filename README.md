ngGridPanel
===========

An easy to use grid repeating module with opening panel.

#Warning
> This project is still in experimental phase

#How To Use

##Include ngGridPanel
```javascript
angular.module('YourModule', ['ngGridPanel']);
```

##Add html
```html
<grid-panel repeat="item in items">
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
<grid-panel>
```