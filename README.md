# [Comments spa](http://44.213.113.121:8888/)

An application with which you can leave comments.
As well as add a photo or a text file to the comment, each comment can be answered as many comments as you like.
Comment preview is available.
Comments are split into pages 25 comments per page, uploading from the server is dynamic


**backend: Node.js**

**frontend: React**

**db/orm: mysql/sequelize**
  

### run server

`cd server`
`npm install`
`nano .env `
<sub>(then u need to provide some variables)</sub>
  
> NODE_DOCKER_PORT=8080

> COMMENTS_ON_PAGE=25

> HOST=localhost

> USER=root

> ROOT_PASSWORD=password

> DATABASE=comments

> DB_PORT=3306

`node app`


### run client

`cd client`
`npm install`
`nano .env `
<sub>(then u need to provide server endpoint ws url)</sub>
  
> REACT_APP_WS_URL
> 
`npm start`
  
  
## Project overview
<img  src="screenshots/comment.png">

##### comment preview
<img  src="screenshots/preview.png">

##### comment reply
<img  src="screenshots/reply_comment.png">
<img  src="screenshots/replies_in_tree.png">

##### attached photo
<img  src="screenshots/photo.png">

##### sorting
<img  src="screenshots/sort.png">

##### pagination
<img  src="screenshots/pagination.png">
