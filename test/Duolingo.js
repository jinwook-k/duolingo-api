const expect = require('chai').expect;

require('dotenv').config({path: "./.env"});
const Duolingo = require('../src/Duolingo');

describe('Duolingo Class',  () => {
    let duolingo;
    let creds = {
        id: process.env.DUOLINGO_ID
    };

    describe('getMetadata()', () => {
        beforeEach(async () => {
            duolingo = new Duolingo(creds);
        });

        it('should have each attribute be a string', async () => {
            let metadata = await duolingo.getRawData();
            console.log('metadata: ', metadata);

        });
    });
});
