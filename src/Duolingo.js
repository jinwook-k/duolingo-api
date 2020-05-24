const axios = require('axios');
const {legacyAchievementDisplayNames, levels} = require("./Constants");


class Duolingo {
    baseUrl = "https://www.duolingo.com/2017-06-30/users";

    constructor({username = '', id = ''}) {
        this.setRequestUrl(username, id);
    }

    /**
     * Sets up which request URL will be used based on the identifier (username | id)
     * @private
     * @param {string} username Duolingo username
     * @param {string} id Duolingo user ID
     */
    setRequestUrl = (username, id) => {
        if (username.length > 0) {
            this.requestUrl = `${this.baseUrl}?username=${username}`;
        }
        else if (id.length > 0) {
            this.requestUrl = `${this.baseUrl}/${id}`;
        }
        else {
            throw new Error("Please provide a Username or an ID.");
        }
    };

    /**
     * Gets selected fields metadata
     * @public
     * @param {Array} fields List of selected fields being requested to retrieve
     * @return {JSON} data Metadata with only selected fields
     */
    getDataByFields = async (fields = []) => {
        let requestUrlWithFields = `${this.requestUrl}?fields=${fields.toString()}`;
        return (await axios.get(requestUrlWithFields)).data;
    }

    /**
     * Gets raw metadata from duolingo. No pre/post-processing
     * @public
     * @return {JSON} data Raw metadata
     */
     getRawData = async () => {
        return (await axios.get(this.requestUrl)).data;
    }

    /**
     * Gets processed metadata from duolingo. Post-processing of adding display name for achievements,
     * Adding level for each course and adding total level based on XP.
     * @public
     * @return {JSON} data Processed metadata
     */
    getProcessedData = async () => {
        let metadata = await this.getRawData();
        metadata["_achievements"] = this.translateAchievements(metadata["_achievements"]);
        metadata["courses"] = this.addLevelToCourses(metadata["courses"]);
        metadata["totalLevel"] = this.translateXpToLevels(metadata["totalXp"]);
        return metadata;
    }

    /**
     * Adds a "level" property to a list of objects, as long as "xp" field is present.
     * @public
     * @param {Array} courses List of course objects with "xp" field
     * @return {Array} courseWithLevel List of courses that include "level" based on "xp"
     */
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

    /**
     * Identifies which level based on xp.
     * @public
     * @param {number|string} xp Amount of experience points
     * @return {number} level Level based on amount of xp
     */
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

    /**
     * Adds a "displayName" property to a list of objects, as long as "name" field is present.
     * @public
     * @param {Array} achievements List of achievements objects with "name" field
     * @return {Array} translatedAchievements List of achievements that include "displayName" based on "name"
     */
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
