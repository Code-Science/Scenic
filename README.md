# SCENIC

## General Description:

A simple node.js web application displaying scenic and beautiful places around the word by rendering ejs templates. A user is allowed to comment on the places. Data is stored in mongodb, and all the routes are handled by express.

## Built Upon

Node.js, Express, Ejs templates, Mongodb, Mongoose, Vanilla Javascript, Css ...

## Routes

### Get
```javascript
"/"
```
For rendering landing page.

```javascript
"/places" 
```
For rendering Places page. It Displays all the places with title and picture.

```javascript
"/places/:id" 
```
For rendering details about the selected place.

### Post
```javascript
"/places/:id/comments"
```
For saving comment in mongodb database.

### Delete
```javascript
"/places/:id/comments/commentId" 
```
For deleting comment from database.
