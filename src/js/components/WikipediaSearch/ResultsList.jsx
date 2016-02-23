define(['react', 'lodash', 'components/WikipediaSearch/Result'], function (React, _, Result) {

    'use strict';

    var ResultsList = React.createClass({
        render: function () {
            return (
                <ul>{_.map(this.props.results, function (res) {return (<Result key={res.id} resultData={res}/>); })}</ul>
            );
        }
    });

    return ResultsList;
});
























































