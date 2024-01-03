const dns = require("node:dns");

const get_input_url_object = (input_url = "") => {
    try {
        return new URL(input_url);
    } catch (error) {
        return { hostname: null, error };
    }
};

const GetUrlHostname = (input_url = "") => get_input_url_object(input_url).hostname;

const CheckDnsStatus = (input_url = "") => {
    return new Promise((resolve, reject) => {
        dns.lookup(input_url, {}, (err, address, family) => {
            if (err) {
                reject(err);
            } else {
                resolve({ address, family });
            }
        });
    });
}

module.exports = { GetUrlHostname, CheckDnsStatus };
