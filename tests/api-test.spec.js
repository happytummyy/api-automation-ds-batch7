const {test, expect} = require("@playwright/test");
const {Ajv} = require("ajv");

const ajv = new Ajv()

test('Test GET', async ( { request } ) => {
    const response = await request.get('https://reqres.in/api/users/2') ;

    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.data.id).toBe(2)
    expect(responseData.data.email).toBe("janet.weaver@reqres.in")
    expect(responseData.data.first_name).toBe("Janet")
    expect(responseData.data.last_name).toBe("Weaver")

    const valid = ajv.validate(require('./jsonschema/tugas-get-schema.json'), responseData);

    if(!valid){
        console.error("AJV Validation Errors:",ajv.errorsText);
    }
    expect(valid).toBe(true);
});


test('Test POST', async ( { request } ) => {
    const bodyData = {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    }

    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.post('https://reqres.in/api/login', {
        headers: headerData,
        data: bodyData
    }) ;
    
    expect(response.status()).toBe(200)

    const responseData = await response.json()

    const valid = ajv.validate(require('./jsonschema/tugas-post-schema.json'), responseData);

    if(!valid){
        console.error("AJV Validation Errors:",ajv.errorsText);
    }
    expect(valid).toBe(false);


});

test('Test DELETE', async ( { request } ) => {

    const response = await request.delete('https://reqres.in/api/USERS/2') ;

    expect(response.status()).toBe(204)

    //console.log(response.status());
    //console.log(response.body());


});

test('Test PUT', async ( { request } ) => {

    const bodyData = {
        "name": "morpheus",
        "job": "zion resident"
    }

    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.put('https://reqres.in/api/users/2', {
        headers: headerData,
        data: bodyData
    }) ;

    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.name).toBe("morpheus")
    expect(responseData.job).toBe("zion resident")

    const valid = ajv.validate(require('./jsonschema/tugas-put-schema.json'), responseData);

    if(!valid){
        console.error("AJV Validation Errors:",ajv.errorsText);
    }
    expect(valid).toBe(true);


});

