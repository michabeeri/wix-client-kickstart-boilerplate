/**
 * Created by michaelb on 23/02/2016.
 */
define(['lodash', 'jquery'],
    function (_, $) {

        'use strict';

        function WikipediaSearchLogic() {}

        WikipediaSearchLogic.prototype.search = function search(searchTerm, resultsHandler){
            var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(searchTerm) + '&callback=?';
            $.getJSON(url).then(function(data){
                resultsHandler(_.zipWith(data[1], data[3], function (name, path) {return {id: _.uniqueId(), name: name, path: path}; }));
            });
        }

        return WikipediaSearchLogic;
    });
























































