/** @jsx React.DOM */

define(['lodash', 'React', 'reactDOM', 'components/WikipediaSearch/WikipediaSearch'],
    function (_, React, ReactDOM, WikipediaSearch) {

    'use strict';

    var TestUtils = React.addons.TestUtils;

    describe('WikipediaSearch', function () {

        describe('Search term change handler', function () {

            var comp,
                results,
                mockedWikiphediaSearchLogic,
                mockResults;

            beforeEach(function () {
                comp = TestUtils.renderIntoDocument(React.createElement(WikipediaSearch));
                mockResults = [{},{}];
                mockedWikiphediaSearchLogic = spyOn(comp.logic, 'search').and.callFake(function(term,callback){
                    callback(mockResults);
                });
            });

            it('should perform search and update results if search term not empty and different from previous search', function () {
                comp.searchTermChangeHandler("giraffe");
                results = _.find(comp.render().props.children, function(child){
                    return typeof(child.type) === 'function' && child.type.displayName === 'ResultsList';
                }).props.results;

                expect(results).toEqual(mockResults);
            });

            it('should not perform search if search term is the same as the previous search', function () {
                comp.searchTermChangeHandler("giraffe");
                comp.searchTermChangeHandler("giraffe");
                expect(mockedWikiphediaSearchLogic).toHaveBeenCalledTimes(1);
            });

            it('should clear results if search term is empty string', function () {
                comp.searchTermChangeHandler("");
                results = _.find(comp.render().props.children, function(child){
                    return typeof(child.type) === 'function' && child.type.displayName === 'ResultsList';
                }).props.results;

                expect(results).toEqual([]);
            });
        });
    });
});
