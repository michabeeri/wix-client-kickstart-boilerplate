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
                //mockedProcessResults = spyOn(comp, 'processQueryResults').and.callFake(function(){done()});
                mockedGetJSON = spyOn($, 'getJSON').and.returnValue(Promise.resolve(mockQueryResults));
            });

            it('should query wikipedia with the supplied search term', function () {
                comp.throttledWikiphediaQuery('giraffe');
                expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent('giraffe')));
            });

            it('should chain processQueryResults to the async wikipedia query', function (done) {
                mockedProcessResults = spyOn(comp, 'processQueryResults').and.callFake(function(){done()});
                comp.throttledWikiphediaQuery('giraffe');
                //expect(mockedProcessResults).toHaveBeenCalledWith(mockQueryResults);
                //done();
            });

            xit('should throttle consecutive queries and issue maximum of 1 per second', function (done) {
                setTimeout(function(){
                    comp.throttledWikiphediaQuery('giraffe');
                    comp.throttledWikiphediaQuery('yak');
                    comp.throttledWikiphediaQuery('seal');
                    setTimeout(function(){
                        expect(mockedGetJSON).toHaveBeenCalledTimes(2);
                        expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent('giraffe')));
                        expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent('seal')));
                        done();
                    }, 1100);
                }, 1100);
            });
        });

        describe('WikipediaSearch processQueryResults', function () {

            var comp,
                mockedUniqeId,
                mockedsetState,
                queryData,
                expectedState;

            beforeEach(function () {
                comp = TestUtils.renderIntoDocument(React.createElement(WikipediaSearch));
                queryData = [
                    'searchTerm',
                    ['name1', 'name2'],
                    null,
                    ['path1', 'path2']
                ];
                expectedState = {
                    searchTerm: 'searchTerm',
                    results: [
                        {id: '0000', name: 'name1', path: 'path1'},
                        {id: '0000', name: 'name2', path: 'path2'}
                    ]
                };
                mockedsetState = spyOn(comp, 'setState');
                mockedUniqeId = spyOn(_, 'uniqueId').and.returnValue('0000');
            });

            it('should parse search term and results from wikipedia query data', function () {
                comp.processQueryResults(queryData);
                expect(mockedsetState).toHaveBeenCalledWith(expectedState);
            });
        });
    });
});
