requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        react: '../vendor/react',
        reactDOM: '../vendor/react-dom',
        router: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
        jquery: "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min"
    },
    map: {
        '*': {
            React: 'react'
        }
    },
    shim: {
        lodash: {
            exports: '_'
        },
        React: {
            exports: 'react'
        },
        reactDom: ['react'],
        jquery: {
            exports: '$'
        }
    }
});

requirejs(['lodash', 'react', 'reactDOM', 'components/MainView'],
    function (_, React, ReactDOM, MainView) {
        'use strict';
        var mountPoint = document.getElementById('app');
        ReactDOM.render(<WikipediaSearch />, mountPoint);
    }
);
