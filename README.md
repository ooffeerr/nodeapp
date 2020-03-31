Hi!
starting the app: 
`npm install && npm run dev`

uploading new words:
please use the `words` endpoint, with a 'method' search param for choosing upload type.
examples:
1. for data on request:
curl -d "Hi! My name is (what?), my name is (who?), my name is Slim Shady" -X POST http://localhost:3000/words?method=data
2. for a file path in request
curl -d "public/testfile.txt" -X POST http://localhost:3000/words?method=file
3. for the uri request
curl -d "http://localhost:3000/testfile.txt" -X POST http://localhost:3000/words?method=url

querying for a word statistic:
1. curl -X GET http://localhost:3000/statistics?word=who
