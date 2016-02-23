/** @jsx React.DOM */

define(['lodash', 'React', 'reactDOM', 'components/WikipediaSearch/SearchBox'],
    function (_, React, ReactDOM, SearchBox) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Search box', function () {
            it('should call props.searchTermChangeHandler for onChange events and pass its value as argument', function () {
                var onChangeCallback = jasmine.createSpy('onChangeCallback');
                var instance = React.createElement(SearchBox, { searchTermChangeHandler: onChangeCallback });
                var comp = TestUtils.renderIntoDocument(instance);
                var node = ReactDOM.findDOMNode(comp);
                node.value = 'giraffe';
                TestUtils.Simulate.change(node);
                expect(onChangeCallback).toHaveBeenCalledWith('giraffe');
            });
        });

    });
