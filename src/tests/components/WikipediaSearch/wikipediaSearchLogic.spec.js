
define(['lodash', 'React', 'reactDOM', 'components/WikipediaSearch/WikipediaSearchLogic'],
    function (_, React, ReactDOM, WikipediaSearchLogic) {

        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Wikipedia search logic', function () {
            var logic,
                resultsHandler,
                searchTerm,
                queryData,
                expectedResults,
                mockedUniqeId,
                mockedGetJSON;

            beforeEach(function () {
                searchTerm = 'giraffe';
                queryData = [null, ['article1', 'article2'], null, ['uri1', 'uri2']];
                expectedResults = [{id: '0000', name: 'article1', path: 'uri1'}, {id: '0000', name: 'article2', path: 'uri2'}];
                mockedUniqeId = spyOn(_, 'uniqueId').and.returnValue('0000');
                mockedGetJSON = spyOn($, 'getJSON').and.returnValue(Promise.resolve(queryData));
                logic = new WikipediaSearchLogic();
            });

            it('should query Wikipedia with the supplied search term', function () {
                logic.search("giraffe", resultsHandler);
                expect(mockedGetJSON).toHaveBeenCalledWith(jasmine.stringMatching('&search=' + encodeURIComponent(searchTerm)));
            });

            it('should call resultsHandler with the results from a successful query', function (done) {
                resultsHandler = function(results){
                    expect(results).toEqual(expectedResults);
                    done();
                };
                logic.search(searchTerm, resultsHandler);
            });
        });
    });
