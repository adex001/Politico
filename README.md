# Politico
Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

[![Build Status](https://travis-ci.com/adex001/Politico.svg?branch=develop)](https://travis-ci.com/adex001/Politico)
[![Coverage Status](https://coveralls.io/repos/github/adex001/Politico/badge.svg?branch=develop)](https://coveralls.io/github/adex001/Politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c9825c134d901c488ac/maintainability)](https://codeclimate.com/github/adex001/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8c9825c134d901c488ac/test_coverage)](https://codeclimate.com/github/adex001/Politico/test_coverage)

### UI Templates
My UI templates can be found here: [ UI ](https://adex001.github.io/Politico/UI/)

### Pivotal Tracker
My Pivotal Tracker board can be found [ here ](https://www.pivotaltracker.com/n/projects/2238846)

### API Documentation
My Swagger API documentation can be found [ here ](https://politico2019.herokuapp.com/api-docs)

### API Endpoints
My API can be found here: [ API ](https://politico2019.herokuapp.com)

### Key Application Features
An admin can perform the following:
 - Admin (electoral body) can create political parties.
 - Admin (electoral body) can modify ​political parties
 - Admin (electoral body) can delete a political party.
 - Admin (electoral body) can create different ​political offices.
 - Admin (electoral body) can delete different ​political offices
 - Admin (electoral body) can modify different ​political offices
 - Users can sign up
 - Users can sign in
 - Users can vote for only one politician per ​political office​.
 - Users can see the results of election

 ### Development
This application was developed using NodeJs with express for routing.

### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

### Installation

- Clone the repository.
- Run git clone (https://github.com/adex001/Politico.git)
``` git clone https://github.com/adex001/Politico.git ```

more info:
(https://help.github.com/articles/cloning-a-repository/)
- Run ``` npm install ``` to install the dependencies in the package.json file.
- Rename ``` .env.sample ``` to ```.env``` and update file as specified.
- Run ``` npm start ``` to start the application.

### Testing

- Navigate to the project location in your terminal.
- Run ``` npm test ``` to run the test.

### API Endpoints
<table>
  <tr>
    <th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
		<th>RESPONSE</th>
  </tr>
  <tr>
    <td> GET /parties </td>
    <td> /api/v1/parties </td>
    <td> Retrieves all parties </td>
    <td> {
      "status": 200,
      "data": [
                {
                    "partyId": 1,
                    "name": "Peoples Democratic Party",
                    "address": "21, Ilupeju Road, Ikeja",
                    "logo": "http://mylogopdp.com/pdp"
                },
                {
                    "partyId": 2,
                    "name": "Alliance National Peoples party",
                    "address": "2, James Owl lane, VI",
                    "logo": "http://mylogodp.com/anpp"
                }
            ]
        }
    </td>
  </tr>
  <tr>
    <td>GET /parties/:id</td>
    <td>/api/v1/parties/:id</td>
    <td>Fetch a specific party</td>
    <td>{
      "status": 200,
      "data": [
          {
              "partyId": 1,
              "name": "Peoples Democratic Party",
              "address": "21, Ilupeju Road, Ikeja",
              "logo": "http://mylogopdp.com/pdp"
          }
      ]
  }</td>
  </tr>
  <tr>
    <td>POST /parties</td>
    <td>/api/v1/parties/</td>
    <td>Creates a party</td>
    <td>{
      "status": 201,
      "data": [
          {
              "partyId": 3,
              "address": "No 21,nejhfeuhebwejbgwj",
              "name": "Councillor",
              "logo": "http://logo.co"
          }
      ]
  }</td>
  </tr>
    <tr>
      <td>PATCH /parties/:id</td>
      <td>/api/v1/parties/:id</td>
      <td>Updates a specific party</td>
      <td>{
    "status": 200,
    "data": [
        {
            "partyId": 2,
            "name": "Councillor",
            "address": "No 21,nejhfeuhebwejbgwj",
            "logo": "http://logo.co"
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>DELETE /parties/:id</td>
      <td>/api/v1/parties/:id</td>
      <td>Deletes a specific political party</td>
      <td>{
    "status": 200,
    "data": [
        {
            "partyId": 2,
            "name": "Councillor",
            "address": "No 21,nejhfeuhebwejbgwj",
            "logo": "http://logo.co"
        },
        {
            "partyId": 3,
            "address": "No 21,nejhfeuhebwejbgwj",
            "name": "Councillor",
            "logo": "http://logo.co"
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>GET /office/:id</td>
      <td>/api/v1/offices/:id</td>
      <td>Fetch a specific office</td>
      <td>{
    "status": 200,
    "data": [
        {
            "officeId": 2,
            "type": "State",
            "name": "Governor",
            "description": "Office of the Governor of Lagos State"
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>GET /offices</td>
      <td>/api/v1/offices/</td>
      <td>Fetch all offices</td>
      <td>{
        "status": 200,
        "data": [
            {
                "officeId": 1,
                "type": "Federal",
                "name": "President",
                "description": "Office of the president of the federal republic of Nigeria"
            },
            {
                "officeId": 2,
                "type": "State",
                "name": "Governor",
                "description": "Office of the Governor of Lagos State"
            }
        ]
    }
      </td>
    </tr>
    <tr>
      <td>POST /offices/</td>
      <td>/api/v1/offices/</td>
      <td>Creates a government office</td>
      <td>{
        "status": 201,
        "data": [
            {
                "officeId": 3,
                "type": "legislative",
                "name": "Councillor",
                "description": "lorem opsum lef"
            }
        ]
    }
      </td>
    </tr>
    <tr>
      <td>PATCH /offices/:id</td>
      <td>/api/v1/offices/:id</td>
      <td>Updates a specific government office</td>
      <td>{
    "status": 200,
    "data": [
        {
            "officeId": 2,
            "type": "legislative",
            "name": "Councillor",
            "description": "lorem opsum lef"
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>DELETE /offices/:id</td>
      <td>/api/v1/offices/:id</td>
      <td>Deletes a specific government office</td>
      <td>{
    "status": 200,
    "data": [
        {
            "officeId": 2,
            "type": "legislative",
            "name": "Councillor",
            "description": "lorem opsum lef"
        },
        {
            "officeId": 3,
            "type": "legislative",
            "name": "Councillor",
            "description": "lorem opsum lef"
        }
    ]
}
      </td>
    </tr>
</table>

### Technologies Used

- JavaScript (ES6) (http://es6-features.org/)
- Node.js (https://nodejs.org/en/)
- Express (https://www.npmjs.com/package/express-api)
- [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

### Author
- Olatunbosun Adeoye Ebenezer

### License
- MIT License
