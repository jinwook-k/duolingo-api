const axios = require('axios');
const baseUrl = "https://www.duolingo.com/2017-06-30/users";
const {legacyAchievementDisplayNames, levels} = require("./Constants");


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
        metadata["courses"] = this.addLevelToCourses(metadata["courses"]);
        metadata["totalLevel"] = this.translateXpToLevels(metadata["totalXp"]);
        return metadata;
    }

    addLevelToCourses = (courses) => {
        let courseWithLevel = [];
        for (let course of courses) {
            courseWithLevel.push({
               ...course,
               level: this.translateXpToLevels(course["xp"])
            });
        }
        return courseWithLevel;
    }


    translateXpToLevels = (xp) => {
        let xpInt = typeof xp === "string" ? parseInt(xp) : xp;

        // Binary Search to find level using XP from range of XPs
        // The level is based on the index of the Levels array, plus 1 (bc it's zero indexed)
        let left = 0;
        let right = levels.length - 1;
        while (left <= right) {
            let mid = Math.floor(left + (right - left) / 2);

            if (levels[mid] === xpInt) {
                // Bc it's zero indexed, we're adding +1 to make the level start from 1
                return mid + 1;
            }
            else if (levels[mid] < xpInt) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }

        // Bc it's zero indexed, we're adding +1 to make the level start from 1
        return right < left ? right + 1 : left + 1;
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

let duolingo = new Duolingo({username: "her"});
let level = duolingo.translateXpToLevels(30000);
console.log('level: ', level);


module.exports = Duolingo;
