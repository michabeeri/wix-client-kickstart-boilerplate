/** @jsx React.DOM */

define(['lodash', 'React', 'reactDOM', 'components/WikipediaSearch/Result'],
    function (_, React, ReactDOM, Result) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Result', function () {
            it('should display name and path from props.resultData', function () {
                var instance = React.createElement(Result, {resultData:{ name: "giraffe", path: "www.linkedin.com/in/giraffe"}});
                var comp = TestUtils.renderIntoDocument(instance);
                var innerAnchorNode = ReactDOM.findDOMNode(comp).querySelector("a");
                expect(innerAnchorNode.text).toBe("giraffe");
                expect(innerAnchorNode.href).toEqual(jasmine.stringMatching("www.linkedin.com/in/giraffe"));
            });
        });

    });
