/** @jsx React.DOM */

define(['lodash', 'React', 'reactDOM', 'components/WikipediaSearch/ResultsList'],
    function (_, React, ReactDOM, ResultsList) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Results list', function () {
            it('should parse results with unique key', function () {
                var resultsDataMock = [{id: '0000'}, {id: '1111'}];
                var instance = React.createElement(ResultsList, {results: resultsDataMock});
                var comp = TestUtils.renderIntoDocument(instance);
                expect(_.map(comp.render().props.children, 'key')).toEqual(_.map(resultsDataMock, 'id'));
            });
        });

    });
