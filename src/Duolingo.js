const axios = require('axios');
const baseUrl = "https://www.duolingo.com/2017-06-30/users";
const legacyAchievementDisplayNames = require("./Constants");

class Duolingo {
    constructor({username = '', id = ''}) {
        this.setRequestUrl(username, id);
    }

    setRequestUrl = (username, id) => {
        if (username.length > 0) {
            this.requestUrl = `${baseUrl}?username=${username}`;
        }
        else if (id.length > 0) {
            this.requestUrl = `${baseUrl}/${id}`;
        }
        else {
            throw new Error("Please provide a Username or an ID.");
        }
    };
}

module.exports = Duolingo;
