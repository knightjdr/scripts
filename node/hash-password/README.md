### Convert a password to a hash or validate a password against one

To generate a password, salt and hash it, and output the information
```
node index.js
```

To validate a password against a hash
```
node index.js --validate --hash=[hashvalue] --iterations=[number of iterations] --password=[password to validate] --salt=[salt used to hash the password]
```

Arguments:

| argument         | definition                                                                                             | default |
|------------------|--------------------------------------------------------------------------------------------------------|---------|
| --algo           | algorithm to use for hashing                                                                           | sha512  |
| --hash           | hash to validate against                                                                               |         |
| --iterations     | hashing iterations                                                                                     | 100000  |
| --keylen         | hash length                                                                                            | 64      |
| --password       | password to hash or to validate (generate one if not supplied)                                         |         |
| --passwordLength | byte length of password (should be divisible by 3; converted to base64 so password will be 1/3 longer) | 24      |
| --salt           | salt to validate against                                                                               |         |
| --saltBytes      | byte length for salt                                                                                   | 128     |
| --validate       | validate a password against a hash                                                                     | false   |

#### Tests

npm test
