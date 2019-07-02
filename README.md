# fyle-backend-psql

## Setup

- Clone the project, `git clone https://github.com/shujathkhan/fyle-backend-psql.git`
- Navigate into root directory, `cd fyle-backend-psql`
- Run `npm install`
- Assuming psql-client and Postgresql are already installed and setup.
- Import the DB to psql, `sudo -u postgres psql indian_banks < indian_banks.sql`
- Run `npm run dev-start`  or to run heroku locally, `heroku local web`

## Testing the APIs

### POST to register new user
	curl -X POST \
	  http://mighty-plateau-67077.herokuapp.com/api/v1/users \
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
	  http://mighty-plateau-67077.herokuapp.com/api/v1/users/login \
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
	  http://mighty-plateau-67077.herokuapp.com/api/v1/getbankdata/ABHY0065008/5/0 \
	  -H 'Accept: */*' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Connection: keep-alive' \
	  -H 'Content-Type: application/json' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZDFmMDJlOS1kZjBhLTQxMTUtYTRkNS1mMDgxOWYyMTkzYzEiLCJpYXQiOjE1NjIwNzI2MDMsImV4cCI6MTU2MjUwNDYwM30.OwTmGoKmLKiDzggAzjT9gtZP7AQo9hcV6wH7KfOMpqY'

### GET Get Branch data using by providing Bank name, city, LIMIT and OFFSET respectively

	curl -X GET \
	  http://mighty-plateau-67077.herokuapp.com/api/v1/getbranchdata/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/MUMBAI/10/0 \
	  -H 'Accept: */*' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Connection: keep-alive' \
	  -H 'Content-Type: application/json' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZDFmMDJlOS1kZjBhLTQxMTUtYTRkNS1mMDgxOWYyMTkzYzEiLCJpYXQiOjE1NjIwNzI2MDMsImV4cCI6MTU2MjUwNDYwM30.OwTmGoKmLKiDzggAzjT9gtZP7AQo9hcV6wH7KfOMpqY'

Time taken to complete : 2.5 hours
