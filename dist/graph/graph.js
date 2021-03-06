'use strict';

var networkVizJS = require('/Users/Spyr1014/Projects/repos/networkVizJS').default;
var makeAbsoluteContext = require('./helpers/makeAbsoluteContext.js');

var graph = function graph(currentState, radialMenu) {
    return networkVizJS("graph", {
        layoutType: "linkDistance",
        nodeShape: function nodeShape(d) {
            switch (d.nodeShape) {
                case "rect":
                    return 'M16 48 L48 48 L48 16 L16 16 Z';
                case "circle":
                    return 'M20,40a20,20 0 1,0 40,0a20,20 0 1,0 -40,0';
                case "capsule":
                    var X = 37;
                    var Y = -13;
                    var p1x = 25 + X,
                        p1y = 25 + Y,
                        p2x = 75 + X,
                        p3x = 100 + X,
                        p4y = 50 + Y;
                    return 'M ' + p1x + ' ' + p1y + ' L ' + p2x + ' ' + p1y + ' C ' + p3x + ' ' + p1y + ' ' + p3x + ' ' + p4y + ' ' + p2x + ' ' + p4y + ' L ' + p1x + ' ' + p4y + ' C ' + X + ' ' + p4y + ' ' + X + ' ' + p1y + ' ' + p1x + ' ' + p1y + ' ';
            }
        },
        nodeToColor: function nodeToColor(d) {
            return d.color;
        },
        mouseOverNode: function mouseOverNode(d, selection) {
            currentState.currentNode.mouseOverNode = true;
            var bbox = selection.node().getBBox(),
                middleX = bbox.x + bbox.width / 2,
                middleY = bbox.y + bbox.height / 2;

            // generate a conversion function
            var convert = makeAbsoluteContext(selection.node(), document.body);

            // use it to calculate the absolute center of the element
            var absoluteCenter = convert(middleX, middleY);

            radialMenu.style.display = "block";
            radialMenu.style.position = 'fixed';
            radialMenu.style.top = absoluteCenter.y;
            radialMenu.style.left = absoluteCenter.x;

            // Set the current state for which node the menu is
            // hovering over.
            currentState.currentNode.data = d;
            currentState.currentNode.selection = selection;
        },
        mouseOutNode: function mouseOutNode(d, selection) {
            // Don't make the radial menu display = none here.
            // Otherwise the radial menu vanishes when you mouse from
            // the node to the menu.
            currentState.currentNode.mouseOverNode = false;
        },
        mouseUpNode: function mouseUpNode(d, selection) {
            // Moved the triplet creation into an observable.
        },
        nodeDragStart: function nodeDragStart() {
            radialMenu.style.display = "none";
        },
        edgeLabelText: function edgeLabelText(d) {
            return d.edgeData.type;
        }

    });
};

module.exports = graph;