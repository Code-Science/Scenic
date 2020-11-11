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




## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 5 versions| last 5 versions| last 5 versions| last 5 versions| last 2 versions| last 5 versions
