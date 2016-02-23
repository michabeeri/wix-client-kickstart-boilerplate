define(['react', 'lodash', 'jquery', 'components/WikipediaSearch/SearchBox', 'components/WikipediaSearch/ResultsList'],
    function (React, _, $, SearchBox, ResultsList) {

        'use strict';

        var WikipediaSearch = React.createClass({
            getInitialState: function () {
                return {
                    searchTerm: '',
                    results: []
                };
            },
            processQueryResults: function (data) {
                this.setState({
                    searchTerm: data[0],
                    results: _.zipWith(data[1], data[3], function (name, path) {return {id: _.uniqueId(), name: name, path: path}; })
                });
            },
            throttledWikiphediaQuery: function (searchTerm) {
                var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(searchTerm) + '&callback=?';
                $.getJSON(url).then(this.processQueryResults);
            },
            searchTermChangeHandler: function (newTerm) {
                if (!newTerm) {
                    this.setState({
                        searchTerm: '',
                        results: []
                    });
                    return;
                }

                if (newTerm !== this.state.searchTerm) {
                    this.throttledWikiphediaQuery(newTerm);
                }
            },
            render: function () {
                return (
                    <div>
                        <div>
                            Wikipedia Query
                        </div>
                        <SearchBox searchTermChangeHandler={this.searchTermChangeHandler}/>
                        <ResultsList results={this.state.results}/>
                    </div>
                );
            }
        });

        return WikipediaSearch;
    });
























































