## Usage
```javascript
const Duolingo = require('duolingo-api');
const credential = {
    username: 'JohnDoe1',
    id: 123456789
};
// can also be {username: 'JohnDoe1}, or {id: 123456789}

let duolingo = new Duolingo(credential);
```
Only one identifier is required, either `username` or `id`.  
`username` property can be empty or omitted, if you are providing an `id`.  
`id` property can be empty or omitted, if you are providing a `username`.  

### Get By Fields
```javascript
const availableFields = [
      "name", "emailVerified", "learningLanguage", "globalAmbassadorStatus",
      "username", "streak", "canUseModerationTools", "hasPhoneNumber",
      "observedClassroomIds", "joinedClassroomIds", "courses",
      "privacySettings", "bio", "inviteURL", "id", "hasPlus",
      "roles", "_achievements", "currentCourseId", "creationDate",
      "picture", "fromLanguage", "hasFacebookId", "optionalFeatures",
      "hasRecentActivity15", "hasGoogleId", "totalXp", "achievements"
];
```
_If you want to see an example of what each fields' data populates, 
look at [UnauthenticatedFullResponse.json](./test/mock/UnauthenticatedFullResponse.json)_

If you're only wanting a select number of fields, create an array of fields that you want. 
Then use `getDataByFields()` method.

In this example, I only want the `totalXp` and `courses` fields.
```javascript
async function getMyFields() {
    const myFields = ['totalXp', 'courses'];
    return await duolingo.getDataByFields(myFields);
}

getMyFields.then(data => {
    console.log('My Fields Data: ', data);
    // My Fields Data: {
    //     "courses": [
    //         {
    //         "placementTestAvailable": false,
    //         "healthEnabled": false,
    //         "learningLanguage": "ja",
    //         "crowns": 102,
    //         "xp": 6751,
    //         "id": "DUOLINGO_JA_EN",
    //         "authorId": "duolingo",
    //         "fromLanguage": "en",
    //         "title": "Japanese",
    //         "preload": false
    //       }
    //     ],
    //     "totalXp": 15385
    // };
});
```

### Get All (raw) Metadata
If you just want all the metadata (as-is) available to you, then use the `getMetadata()` method.
```javascript
async function getMetadata() {
    return await duolingo.getRawData();
}

getMetadata.then(data => {
    console.log('My Metadata: ', data);
});
```
The data would print out something similar to [UnauthenticatedFullResponse.json](./test/mock/UnauthenticatedFullResponse.json).  
The output is the raw format/values of what the duolingo unauthenticated response will give. 

## Get All (processed) Metadata
Some things it doesn't include is friendlier display names for your achievements, 
and the legacy _levels_ that it once had. _Levels_ eventually got replaced by _Crowns_ 
on how Duolingo would track progress. 



### Extra Info
- [legacy/modern achievements](https://duolingo.fandom.com/wiki/Achievements)
- [experience to level table](https://forum.duolingo.com/comment/33002358)
