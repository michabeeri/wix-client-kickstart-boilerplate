define(['react'], function (React) {

    'use strict';

    var SearchBox = React.createClass({
        render: function () {
            return (
                <input type="text" placeholder="Search term" onChange={function (evt) {return this.props.searchTermChangeHandler(evt.target.value); }.bind(this)}/>
            );
        }
    });

    return SearchBox;
});
























































