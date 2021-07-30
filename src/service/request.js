import $ from 'jquery';
window.$ = $;

const token = btoa('_UT0P1A_LiveStream_API_:JUt6rswxV2Fr8vt$-&?');
const urlBase = 'https://utopialive.hu/streamApi';

const Request = (options) => {
    const DefaultOptions = {
        method: 'get',
        dataType: 'json',
        url: urlBase,
        crossDomain: true,
        headers: {
            'Authorization': 'Basic ' + token
        },
        timeout: 10000
    };

    if (options.url) {
        DefaultOptions.url += options.url;
        delete options.url;
    }

    options = $.extend(DefaultOptions, options);
    return $.ajax(options);
}

export default Request;