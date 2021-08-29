# Intro
A basic typescript wrapper for browser fetch
 
Supports get, delete (del), put, post and patch.

Thows exception in case of 4xx or 5xx and saves you from checking that (and forgetting to check). Browser fetch does not throw an error for 4xx ot 5xx, you have to check that yourself and handle. 

How to use
```
  try {
    const data = await fwap.get('https://www.reddit.com/search.json?q=cats&sort=new')
  } catch (err) {
    // handle http error, statusCode in err.message
  }
  
```
OR

```
  fwap.get('https://www.reddit.com/search.json?q=cats&sort=new')
  .then(data => {
     data.data.children.forEach(item => console.log(item.data.title));
   });
```

note: http delete is fwap.del

If an Error exception is thrown is will contain the http status code in the message.

Yes, this is yet another fetch wrapper but its easy to use and who doesn't like to wap!
