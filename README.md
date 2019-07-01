# fyle-backend-psql

## Setup

- Clone the project, `git clone https://github.com/shujathkhan/fyle-backend-psql.git`
- Navigate into root directory, `cd fyle-backend-psql`
- Run `npm install`
- Run `npm run dev-start`  or to run heroku locally, `heroku local web`

## Testing the APIs

### POST to register new user
	curl -X POST \
	  http://localhost:3000/api/v1/users \
	  -H 'Accept: */*' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Connection: keep-alive' \
	  -H 'Content-Type: application/json' \
	  -d '{ 

		"password":"mypass123" ,
		"email":"shujathlive@gamil.com"

	}'


### POST to login
	curl -X POST \
	  http://localhost:3000/api/v1/users/login \
	  -H 'Accept: */*' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Connection: keep-alive' \
	  -H 'Content-Type: application/json' \
	  -d '{ 

		"password":"mypass123" ,
		"email":"shujathlive@gamil.com"

	}'

### GET Get Bank detail using by providing IFSC code, LIMIT and OFFSET respectively

	curl -X GET \
	  http://localhost:3000/api/v1/getbankdata/ABHY0065008/5/0 \
	  -H 'Accept: */*' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Connection: keep-alive' \
	  -H 'Content-Type: application/json' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNGMzMDNlZC05MWYyLTQ2N2EtOWQwMC1kNDQ2Y2ZkMWFmNzkiLCJpYXQiOjE1NjIwMTMyMzYsImV4cCI6MTU2MjM1ODgzNn0.HxWi2eqgB8ik84hYZNdidLhMrSZbcPGukxcy8dJHpyM'

### GET Get Branch data using by providing Bank name, city, LIMIT and OFFSET respectively

	curl -X GET \
	  http://localhost:3000/api/v1/getbranchdata/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/MUMBAI/10/0 \
	  -H 'Accept: */*' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Connection: keep-alive' \
	  -H 'Content-Type: application/json' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNGMzMDNlZC05MWYyLTQ2N2EtOWQwMC1kNDQ2Y2ZkMWFmNzkiLCJpYXQiOjE1NjIwMTMyMzYsImV4cCI6MTU2MjM1ODgzNn0.HxWi2eqgB8ik84hYZNdidLhMrSZbcPGukxcy8dJHpyM'

Time taken to complete : 2.5 hours
