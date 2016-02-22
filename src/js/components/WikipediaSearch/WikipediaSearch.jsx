define(['react', 'lodash', 'jquery'],
    function (React, _, $) {

        'use strict';

        var App = React.createClass({
            getInitialState: function () {
                return {
                    searchTerm: '',
                    results: []
                };
            },
            processQueryResults: function (data) {
                this.setState({
                    results: _.zipWith(data[1], data[3], function (name, path) {return {id: _.uniqueId(), name: name, path: path}; })
                });
            },
            throttledWikiphediaQuery: _.throttle(function (searchTerm) {
                    var cleanTerm = encodeURIComponent(searchTerm);
                    var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + cleanTerm + '&callback=?';
                    var self = this;
                    $.getJSON(url).then(function (data) {
                        self.processQueryResults(data);
                        self.setState({searchTerm: searchTerm});
                    });
                },
                1000),
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

        var SearchBox = React.createClass({
            render: function () {
                return (
                    <input type="text" placeholder="Search term" onChange={function (evt) {return this.props.searchTermChangeHandler(evt.target.value); }.bind(this)}/>
                );
            }
        });

        var ResultsList = React.createClass({
            render: function () {
                return (
                    <ul>{_.map(this.props.results, function (res) {return (<Result key={res.id} resultData={res}/>); })}</ul>
                );
            }
        });

        var Result = React.createClass({
            render: function () {
                return (
                    <li><a href={this.props.resultData.path}>{this.props.resultData.name}</a></li>
                );
            }
        });

        return App;
    });
























































