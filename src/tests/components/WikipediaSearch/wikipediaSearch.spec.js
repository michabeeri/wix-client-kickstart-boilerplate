/** @jsx React.DOM */

define(['lodash', 'React', 'reactDOM', 'components/WikipediaSearch/WikipediaSearch'], function (_, React, ReactDOM, WikipediaSearch) {

    'use strict';

    var TestUtils = React.addons.TestUtils;

    describe('WikipediaSearch', function () {

        describe('WikipediaSearch searchTermChangeHandler', function () {

            var comp,
                mockedWikiphediaQuery,
                mockSetState;

            beforeEach(function () {
                comp = TestUtils.renderIntoDocument(React.createElement(WikipediaSearch));
                mockedWikiphediaQuery = spyOn(comp, 'throttledWikiphediaQuery');
                mockSetState = spyOn(comp, 'setState')
            });

            it('should call throttledWikiphediaQuery but should not call setState if search term is truthy and different from previous search', function () {
                comp.state = {searchTerm: 'druids'};
                comp.searchTermChangeHandler("giraffe");
                expect(mockedWikiphediaQuery).toHaveBeenCalledWith("giraffe");
                expect(mockSetState).not.toHaveBeenCalled();
            });

            it('should not call throttledWikiphediaQuery and should not call setState if search term is truthy and same as the previous search', function () {
                comp.state = {searchTerm: 'druids'};
                comp.searchTermChangeHandler("druids");
                expect(mockedWikiphediaQuery).not.toHaveBeenCalled();
                expect(mockSetState).not.toHaveBeenCalled();
            });

            it('should not call throttledWikiphediaQuery but should call setState if search term is falsy', function () {
                comp.state = {searchTerm: 'druids'};
                comp.searchTermChangeHandler('');
                expect(mockedWikiphediaQuery).not.toHaveBeenCalled();
                expect(mockSetState).toHaveBeenCalledWith({searchTerm: '', results: []});
            });
        });

        describe('WikipediaSearch throttledWikiphediaQuery', function () {

            var comp,
                mockedGetJSON,
                mockedProcessResults,
                mockQueryResults;

            beforeEach(function () {
                comp = TestUtils.renderIntoDocument(React.createElement(WikipediaSearch));
                mockQueryResults = {};
                mockedProcessResults = spyOn(comp, 'processQueryResults');
                mockedGetJSON = spyOn($, 'getJSON').and.returnValue(new Promise(function(resolve){
                    resolve(mockQueryResults);
                }));
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('should query wikipedia with the supplied search term', function () {
                comp.throttledWikiphediaQuery('giraffe');
                expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent('giraffe')));
            });

            it('should chain processQueryResults to the async wikipedia query', function (done) {
                comp.throttledWikiphediaQuery('giraffe');
                window.setTimeout(function(){
                    expect(mockedProcessResults).toHaveBeenCalledWith(mockQueryResults);
                    done();
                }, 0);
            });

            it('should throttle consecutive queries and issue maximum of 1 per second', function (done) {
                comp.throttledWikiphediaQuery('giraffe');
                comp.throttledWikiphediaQuery('yak');
                comp.throttledWikiphediaQuery('seal');
                window.setTimeout(function(){
                    expect(mockedGetJSON).toHaveBeenCalledTimes(2);
                    expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent('giraffe')));
                    expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent('seal')));
                }, 1100);
                jasmine.clock().tick(1200);
            });
        });
    });
});
