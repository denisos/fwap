# Intro
A basic typescript wrapper for browser fetch
 
Supports get, delete (del), put, post and patch.

Thows exception in case of 4xx or 5xx and saves you from checking that (and forgetting to check). Browser fetch does not throw an error for 4xx ot 5xx, you have to check that yourself and handle. 

Calls .json() on the response for you so you get back json.

## Install

    npm install fwap 

    yarn add fwap

## Usage

See unit tsts for more examples

```
  import fwap from 'fwap';

  try {
    const data = await fwap.get<MyItems[]>('https://www.reddit.com/search.json?q=cats&sort=new');
    // data is the json response, do something with data
  } catch (err) {
    // handle http error, statusCode in err.message
  }
  
```
OR

```
  import fwap from 'fwap';


  fwap.get('https://www.reddit.com/search.json?q=cats&sort=new')
  .then(data => {
     data.data.children.forEach(item => console.log(item.data.title));
   });
```

note: http delete is fwap.del

If an Error exception is thrown is will contain the http status code in the message.

Yes, this is yet another fetch wrapper but its easy to use and who doesn't like to wap!


## build
```
  npm run build
```

## tests
```
  npm run test
```
