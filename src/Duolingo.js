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

    getDataByFields = async (fields = []) => {
        let requestUrlWithFields = `${this.requestUrl}?fields=${fields.toString()}`;
        return (await axios.get(requestUrlWithFields)).data;
    }

     getRawData = async () => {
        return (await axios.get(this.requestUrl)).data;
    }

    getProcessedData = async () => {
        let metadata = await this.getRawData();
        metadata["_achievements"] = this.translateAchievements(metadata["_achievements"]);
    }

    translateAchievements = (achievements) => {
        let translatedAchievements = [];
        for (let achievement of achievements) {
            translatedAchievements.push({
                ...achievement,
                displayName: legacyAchievementDisplayNames[achievement.name]
            });
        }
        return translatedAchievements;
    }
}

module.exports = Duolingo;
