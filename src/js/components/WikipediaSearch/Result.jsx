define(['react'], function (React) {

    'use strict';

    var Result = React.createClass({
        render: function () {
            return (
                <li><a href={this.props.resultData.path}>{this.props.resultData.name}</a></li>
            );
        }
    });

    return Result;
});
























































