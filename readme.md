# How to use the server of dapp-energy application

1) Download the code of pull the code to your PC.

2) Open the code folder in you desired code editor (Mine:VSCode)

3) Install all the npm packages required in this project

`npm i`

4) Run the node application

`node server.js`

Note : Ensure you have already installed node and npm in your project. you can download from [here](https://nodejs.org/en/download/)

## Front-End for dapp-energy
This repo is only the server of dapp-energy. You can download the front-end (ReactJS) code from the following [repo](https://github.com/HARSH-KUMAR10/dapp-energy-client)


<table border='1' cellspacing='0' cellpadding='10'>

<tr>
<th>API route</th>
<th>Description</th>
<th>Failed Response</th>
<th>Success Response</th>
</tr>

<tr>
<td>/</td>
<td>The initial route</td>
<td>Error : check server status</td>
<td><code>Welcome to the server of Energy Share</code></td>
</tr>

<tr>
<td>/createUser [GET]</td>
<td>Takes parameters as of email(string) and password(string), and creates a user in the database</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo)} }</code></td>
</tr>

<tr>
<td>/readUser [GET]</td>
<td>Takes parameters as email(string) and password(string), and checks if a user with same email and password is present or not</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: {id: result._id,email: result.Email,wallet: result.Wallet} }</code></td>
</tr>


<tr>
<td>/createHolding [GET]</td>
<td>Takes email[string], id(MongoID:string), units(number), price(number) where email and id are session tracked values and units and price are added by customer to create a holding to sell energy units on certain price</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo) }</code></td>
</tr>

<tr>
<td>/updateWallet [GET]</td>
<td>Takes id(MongoID:string), wallet(number) and then updates the wallet value of the user in the database to a new wallet value using the users unique MongoID</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo) }</code></td>
</tr>


<tr>
<td>/readHoldingById [GET]</td>
<td>Takes id(MongoID:string) and gets all the holding created by the user where the holding is still active and not removed by user</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo [all the holding of the id]) }</code></td>
</tr>

<tr>
<td>/readHoldings [GET]</td>
<td>Takes no paramter, sends all the holding which are not removed by the owner(user), actived by the admin and is not sold yet to another user in the market</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo [all the holding(not closed,sold and are admin activated)]) }</code></td>
</tr>

<tr>
<td>/readHoldingsNotActive</td>
<td>Takes no paramter, sends all the holding which are not removed by the owner(user), not actived by the admin and is not sold yet to another user in the market</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo [all the holding(not closed,sold and are admin activated)]) }</code></td>
</tr>

<tr>
<td>/removeHoliding [GET]</td>
<td>Takes id(MongoID:string) as parameter, uses this unique mongoID for a holding to delete the holding from the database</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo) }</code></td>
</tr>

<tr>
<td>/adminRemoveHoliding [GET]</td>
<td>Takes parameter id(MongoID:string), id of a holding is used to change the status of holding to admin not approved state</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo) }</code></td>
</tr>

<tr>
<td>/approveHoliding [GET]</td>
<td>Takes parameter id(MongoID:string), id of a holding is used to change the status of holding to admin approved state</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo) }</code></td>
</tr>

<tr>
<td>/createTransaction [GET]</td>
<td>Takes from(email:string), to(email:string), units(number), total(number) as parameter, where from is the user selling the units, to is the user buying the units, units is the total number of energy units to be sold, price is the amount of price paid for it. This data is stored in the database and on GunDB also(if connected from frontend). Also changed the state of "Sold" in holding from false to true</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo) }</code></td>
</tr>

<tr>
<td>/readTransacionByEmail [GET]</td>
<td>Takes email(string), user email as parameter to fetch all the transactions where the email is included either in from or to.</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo [all the transaction with from or to as email]) }</code></td>
</tr>

<tr>
<td>/readTransactions [GET]</td>
<td>reads all the transactions and return as array</td>
<td><code>{ success: false }</code></td>
<td><code>{ success: true, data: result(response from mongo [all the transactions]) }</code></td>
</tr>


</table>