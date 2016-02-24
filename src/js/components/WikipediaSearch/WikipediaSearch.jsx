define(['react', 'lodash', 'jquery', 'components/WikipediaSearch/SearchBox', 'components/WikipediaSearch/ResultsList', 'components/WikipediaSearch/WikipediaSearchLogic'],
    function (React, _, $, SearchBox, ResultsList, WikipediaSearchLogic) {

        'use strict';

        var WikipediaSearch = React.createClass({
            getInitialState: function () {
                return {
                    searchTerm: '',
                    results: []
                };
            },
            componentDidMount: function () {
                this.logic = new WikipediaSearchLogic();
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
                    this.logic.search(newTerm, function(results){
                        this.setState({searchTerm: newTerm, results: results})
                    }.bind(this));
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
























































