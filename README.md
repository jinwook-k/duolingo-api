## Fields
This is an example response body when requesting all the metadata for you profile.
```javascript
const availableFields = [
    {
      "name": "John Doe",
      "emailVerified": true,
      "learningLanguage": "ja",
      "globalAmbassadorStatus": {},
      "username": "JohnDoe1",
      "streak": 58,
      "canUseModerationTools": false,
      "hasPhoneNumber": false,
      "observedClassroomIds": [],
      "joinedClassroomIds": [],
      "courses": [
        {
          "placementTestAvailable": false,
          "healthEnabled": false,
          "learningLanguage": "ja",
          "crowns": 102,
          "xp": 6751,
          "id": "DUOLINGO_JA_EN",
          "authorId": "duolingo",
          "fromLanguage": "en",
          "title": "Japanese",
          "preload": false
        }
      ],
      "privacySettings": [],
      "bio": "",
      "inviteURL": "https://invite.duolingo.com/ABCDEFG1234567",
      "id": 123456789,
      "hasPlus": false,
      "roles": [
        "users"
      ],
      "_achievements": [
        {
          "name": "streak",
          "count": 58,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            2,
            7,
            30
          ]
        },
        {
          "name": "completion",
          "count": 0,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            10,
            20,
            131
          ]
        },
        {
          "name": "spending",
          "count": 900,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            20,
            50,
            200
          ]
        },
        {
          "name": "items",
          "count": 22,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            1,
            1,
            1
          ]
        },
        {
          "name": "time",
          "count": 18,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            1,
            1,
            1
          ]
        },
        {
          "name": "social",
          "count": 0,
          "tier": 3,
          "shouldShowUnlock": true,
          "tierCounts": [
            3,
            3,
            1
          ]
        },
        {
          "name": "xp",
          "count": 15,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            50,
            100,
            200
          ]
        },
        {
          "name": "perfect",
          "count": 406,
          "tier": 3,
          "shouldShowUnlock": false,
          "tierCounts": [
            1,
            5,
            20
          ]
        }
      ],
      "currentCourseId": "DUOLINGO_JA_EN",
      "creationDate": 1504819526,
      "picture": "//duolingo-images.s3.amazonaws.com/avatars/123456789/ABC_123",
      "fromLanguage": "en",
      "hasFacebookId": true,
      "optionalFeatures": [
        {
          "status": "ON",
          "id": "convert_lingots_to_gems"
        },
        {
          "status": "ON",
          "id": "levels_opt_in_v1"
        },
        {
          "status": "AVAILABLE",
          "id": "stories_ios"
        },
        {
          "status": "ON",
          "id": "leaderboards_opt_in"
        },
        {
          "status": "AVAILABLE",
          "id": "stories_ios_waitlist"
        }
      ],
      "hasRecentActivity15": false,
      "hasGoogleId": true,
      "totalXp": 15385,
      "achievements": []
    }
];
```

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
If you're only wanting a select number of fields, create an array of fields that you want. 
Then call `getDataByFields()` method.

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

### Get All Available Metadata
```javascript
async function getMetadata() {
    return await duolingo.getRawData();
}

getMetadata.then(data => {
    console.log('My Metadata: ', data);
    //My Metadata: {
    //  "name": "John Doe",
    //  "emailVerified": true,
    //  "learningLanguage": "ja",
    //  "globalAmbassadorStatus": {},
    //  "username": "JohnDoe1",
    //  "streak": 58,
    //  "canUseModerationTools": false,
    //  "hasPhoneNumber": false,
    //  "observedClassroomIds": [],
    //  "joinedClassroomIds": [],
    //  "courses": [
    //    {
    //      "placementTestAvailable": false,
    //      "healthEnabled": false,
    //      "learningLanguage": "ja",
    //      "crowns": 102,
    //      "xp": 6751,
    //      "id": "DUOLINGO_JA_EN",
    //      "authorId": "duolingo",
    //      "fromLanguage": "en",
    //      "title": "Japanese",
    //      "preload": false
    //    }
    //  ],
    //  "privacySettings": [],
    //  "bio": "",
    //  "inviteURL": "https://invite.duolingo.com/ABCDEFG1234567",
    //  "id": 123456789,
    //  "hasPlus": false,
    //  "roles": [
    //    "users"
    //  ],
    //  "_achievements": [
    //    {
    //      "name": "streak",
    //      "count": 58,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        2,
    //        7,
    //        30
    //      ]
    //    },
    //    {
    //      "name": "completion",
    //      "count": 0,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        10,
    //        20,
    //        131
    //      ]
    //    },
    //    {
    //      "name": "spending",
    //      "count": 900,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        20,
    //        50,
    //        200
    //      ]
    //    },
    //    {
    //      "name": "items",
    //      "count": 22,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        1,
    //        1,
    //        1
    //      ]
    //    },
    //    {
    //      "name": "time",
    //      "count": 18,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        1,
    //        1,
    //        1
    //      ]
    //    },
    //    {
    //      "name": "social",
    //      "count": 0,
    //      "tier": 3,
    //      "shouldShowUnlock": true,
    //      "tierCounts": [
    //        3,
    //        3,
    //        1
    //      ]
    //    },
    //    {
    //      "name": "xp",
    //      "count": 15,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        50,
    //        100,
    //        200
    //      ]
    //    },
    //    {
    //      "name": "perfect",
    //      "count": 406,
    //      "tier": 3,
    //      "shouldShowUnlock": false,
    //      "tierCounts": [
    //        1,
    //        5,
    //        20
    //      ]
    //    }
    //  ],
    //  "currentCourseId": "DUOLINGO_JA_EN",
    //  "creationDate": 1504819526,
    //  "picture": "//duolingo-images.s3.amazonaws.com/avatars/123456789/ABC_123",
    //  "fromLanguage": "en",
    //  "hasFacebookId": true,
    //  "optionalFeatures": [
    //    {
    //      "status": "ON",
    //      "id": "convert_lingots_to_gems"
    //    },
    //    {
    //      "status": "ON",
    //      "id": "levels_opt_in_v1"
    //    },
    //    {
    //      "status": "AVAILABLE",
    //      "id": "stories_ios"
    //    },
    //    {
    //      "status": "ON",
    //      "id": "leaderboards_opt_in"
    //    },
    //    {
    //      "status": "AVAILABLE",
    //      "id": "stories_ios_waitlist"
    //    }
    //  ],
    //  "hasRecentActivity15": false,
    //  "hasGoogleId": true,
    //  "totalXp": 15385,
    //  "achievements": []
    //}
});
```
