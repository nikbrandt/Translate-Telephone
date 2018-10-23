const request = require('request');

// var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
// + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

function translate (from, to, text) {
    return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

        request(url, (error, res, body) => {
            if (error) return reject(error);
            try {
                let parsed = JSON.parse(body)[0][0][0];
                resolve(parsed);
            } catch (e) {
                return reject(e);
            }
        });
    });
}

translate('en-US', 'sw', 'hi how are you').then(res => {
    console.log(res);
}).catch(err => {
    console.error('Could not translate: \n' + err);
});