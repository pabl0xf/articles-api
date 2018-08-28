# Articles Rest API

This is a fully functional restful API to create, retrieve an update articles. It can be
use as a skel to kick start new projects even when the final purpose is persist
another kind of entity. A minimal set of test provide a initial coverage, data is set to
be store on MongoDB.

### Setup
```bash
$ npm install
```

### External Dependencies
You have to provide a mongodb instance, either local or remote. Check configuration section below.

### Configuration
Database configuration is set as an environment variable and can be set from different stagings, by default DEVELOPMENT stage will be use unless another stage is manually set before starting express server:
```bash
$ ENVIRONMENT=production node server.js
```

### Init server
```bash
$ node server.js
```

### Usage
#### Create user
```bash
$ curl -X POST -H "Content-Type: application/json" -H "Authentication: 5CD4ED173E1C95FE763B753A297D5" -d '{ "name": "Pedro Guzman", "avatar": "https://www.off2class.com/wp-content/uploads/2015/11/Off2class-AvatarProfilePic-01-Colour-James.jpg" }' http://localhost:3000/users
```
#### Create article
```bash
$ curl -X POST -H "Content-Type: application/json" -H "Authentication: 5CD4ED173E1C95FE763B753A297D5" -d '{ "userId": "3as3365775654455", "title": "Test ARticle 1", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus diam ac dui consequat, et sagittis lacus tincidunt", "tags": ["tag1", "Lorem"] }' http://localhost:3000/articles
```

#### Edit article
```bash
$ curl -X PUT -H "Content-Type: application/json" -H "Authentication: 5CD4ED173E1C95FE763B753A297D5" -d '{ "title": "Test Update Article 1" }' http://localhost:3000/articles/:articleId
```

#### Delete article
```bash
$ curl -X DELETE -H "Authentication: 5CD4ED173E1C95FE763B753A297D5" http://localhost:3000/articles/:articleId
```
