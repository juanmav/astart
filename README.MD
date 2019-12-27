# A* implementation in NodeJs

![Barcelona-Sevilla-path](Barcelona-servilla-nice-net-animated.gif)

Two implementations: 

- Full in memory graph loaded from file
- Partial in memory graph loaded from sqlite db.

## Basic usage
Loading DB
Total Time:0.5204909999999999
Start node to UAB CRM
Total Time:3689.446746
Loading bin File
Total Time:136651.5715
Start node to Sevilla
Total Time:4539.150839

```javascript

/**
 * @param startId integer start node id
 * @param endId integer end node id
 * @param nodeFactory NodeFactory object
 * @param progressWrite write progress function
 * */

let path = await AStarPath(
        startNodeId,
        endNodeId,
        nodeFactory,
        progressChecker
    );
```

## Full example usage.

Check the index.js file to full example usage.

```shell script
~/node --max-old-space-size=12288 index.js 
```

*Output*

```shell script
Loading DB
Total Time:0.5204909999999999
Start node to UAB CRM
Total Time:3689.446746
Loading bin File
Total Time:136651.5715
Start node to Sevilla
Total Time:4539.150839
```

Also check the folder `/runs` there are the result of the calculated paths,
the `.json` file's content can be copy & paste on [http://geojson.io/](http://geojson.io/)

## Some processing 
Take the nodes and ways from main fails and split them into two files.

### Cataluna
cd raw
tail -n +3 cataluna.csv | grep '^node' > nodes.csv
tail -n +3 cataluna.csv | grep '^way' > ways.csv
cd ..

### Spain
cd raw
tail -n +3 spain.csv | grep '^node' > nodes.csv
tail -n +3 spain.csv | grep '^way' > ways.csv
cd..

### Same for both regions

```shell script
export NODE_OPTIONS=--max-old-space-size=12888
node process-csv.js > fullinserts.sql
mv fullinserts.sql migrations/
cd migrations
split --lines=1000000 --suffix-length=2 --numeric-suffixes fullinserts.sql 1
rename 's/(.*)/$1-out.sql/' 1*

for i in {100..172}; do echo "sed -i '1iBEGIN TRANSACTION;' $i-out.sql; echo 'COMMIT;' >> $i-out.sql;"; done

sed -i '1iBEGIN TRANSACTION;' 100-out.sql; echo "COMMIT;" >> 100-out.sql;
sed -i '1iBEGIN TRANSACTION;' 101-out.sql; echo "COMMIT;" >> 101-out.sql;
sed -i '1iBEGIN TRANSACTION;' 102-out.sql; echo "COMMIT;" >> 102-out.sql;
sed -i '1iBEGIN TRANSACTION;' 103-out.sql; echo "COMMIT;" >> 103-out.sql;
sed -i '1iBEGIN TRANSACTION;' 104-out.sql; echo "COMMIT;" >> 104-out.sql;
sed -i '1iBEGIN TRANSACTION;' 105-out.sql; echo "COMMIT;" >> 105-out.sql;
sed -i '1iBEGIN TRANSACTION;' 106-out.sql; echo "COMMIT;" >> 106-out.sql;
sed -i '1iBEGIN TRANSACTION;' 107-out.sql; echo "COMMIT;" >> 107-out.sql;
sed -i '1iBEGIN TRANSACTION;' 108-out.sql; echo "COMMIT;" >> 108-out.sql;
sed -i '1iBEGIN TRANSACTION;' 109-out.sql; echo "COMMIT;" >> 109-out.sql;
sed -i '1iBEGIN TRANSACTION;' 110-out.sql; echo "COMMIT;" >> 110-out.sql;
sed -i '1iBEGIN TRANSACTION;' 111-out.sql; echo "COMMIT;" >> 111-out.sql;
sed -i '1iBEGIN TRANSACTION;' 112-out.sql; echo "COMMIT;" >> 112-out.sql;
sed -i '1iBEGIN TRANSACTION;' 113-out.sql; echo "COMMIT;" >> 113-out.sql;
sed -i '1iBEGIN TRANSACTION;' 114-out.sql; echo "COMMIT;" >> 114-out.sql;
sed -i '1iBEGIN TRANSACTION;' 115-out.sql; echo "COMMIT;" >> 115-out.sql;
sed -i '1iBEGIN TRANSACTION;' 116-out.sql; echo "COMMIT;" >> 116-out.sql;
sed -i '1iBEGIN TRANSACTION;' 117-out.sql; echo "COMMIT;" >> 117-out.sql;
sed -i '1iBEGIN TRANSACTION;' 118-out.sql; echo "COMMIT;" >> 118-out.sql;
sed -i '1iBEGIN TRANSACTION;' 119-out.sql; echo "COMMIT;" >> 119-out.sql;
sed -i '1iBEGIN TRANSACTION;' 120-out.sql; echo "COMMIT;" >> 120-out.sql;
sed -i '1iBEGIN TRANSACTION;' 121-out.sql; echo "COMMIT;" >> 121-out.sql;
sed -i '1iBEGIN TRANSACTION;' 122-out.sql; echo "COMMIT;" >> 122-out.sql;
sed -i '1iBEGIN TRANSACTION;' 123-out.sql; echo "COMMIT;" >> 123-out.sql;
sed -i '1iBEGIN TRANSACTION;' 124-out.sql; echo "COMMIT;" >> 124-out.sql;
sed -i '1iBEGIN TRANSACTION;' 125-out.sql; echo "COMMIT;" >> 125-out.sql;
sed -i '1iBEGIN TRANSACTION;' 126-out.sql; echo "COMMIT;" >> 126-out.sql;
sed -i '1iBEGIN TRANSACTION;' 127-out.sql; echo "COMMIT;" >> 127-out.sql;
sed -i '1iBEGIN TRANSACTION;' 128-out.sql; echo "COMMIT;" >> 128-out.sql;
sed -i '1iBEGIN TRANSACTION;' 129-out.sql; echo "COMMIT;" >> 129-out.sql;
sed -i '1iBEGIN TRANSACTION;' 130-out.sql; echo "COMMIT;" >> 130-out.sql;
sed -i '1iBEGIN TRANSACTION;' 131-out.sql; echo "COMMIT;" >> 131-out.sql;
sed -i '1iBEGIN TRANSACTION;' 132-out.sql; echo "COMMIT;" >> 132-out.sql;
sed -i '1iBEGIN TRANSACTION;' 133-out.sql; echo "COMMIT;" >> 133-out.sql;
sed -i '1iBEGIN TRANSACTION;' 134-out.sql; echo "COMMIT;" >> 134-out.sql;
sed -i '1iBEGIN TRANSACTION;' 135-out.sql; echo "COMMIT;" >> 135-out.sql;
sed -i '1iBEGIN TRANSACTION;' 136-out.sql; echo "COMMIT;" >> 136-out.sql;
sed -i '1iBEGIN TRANSACTION;' 137-out.sql; echo "COMMIT;" >> 137-out.sql;
sed -i '1iBEGIN TRANSACTION;' 138-out.sql; echo "COMMIT;" >> 138-out.sql;
sed -i '1iBEGIN TRANSACTION;' 139-out.sql; echo "COMMIT;" >> 139-out.sql;
sed -i '1iBEGIN TRANSACTION;' 140-out.sql; echo "COMMIT;" >> 140-out.sql;
sed -i '1iBEGIN TRANSACTION;' 141-out.sql; echo "COMMIT;" >> 141-out.sql;
sed -i '1iBEGIN TRANSACTION;' 142-out.sql; echo "COMMIT;" >> 142-out.sql;
sed -i '1iBEGIN TRANSACTION;' 143-out.sql; echo "COMMIT;" >> 143-out.sql;
sed -i '1iBEGIN TRANSACTION;' 144-out.sql; echo "COMMIT;" >> 144-out.sql;
sed -i '1iBEGIN TRANSACTION;' 145-out.sql; echo "COMMIT;" >> 145-out.sql;
sed -i '1iBEGIN TRANSACTION;' 146-out.sql; echo "COMMIT;" >> 146-out.sql;
sed -i '1iBEGIN TRANSACTION;' 147-out.sql; echo "COMMIT;" >> 147-out.sql;
sed -i '1iBEGIN TRANSACTION;' 148-out.sql; echo "COMMIT;" >> 148-out.sql;
sed -i '1iBEGIN TRANSACTION;' 149-out.sql; echo "COMMIT;" >> 149-out.sql;
sed -i '1iBEGIN TRANSACTION;' 150-out.sql; echo "COMMIT;" >> 150-out.sql;
sed -i '1iBEGIN TRANSACTION;' 151-out.sql; echo "COMMIT;" >> 151-out.sql;
sed -i '1iBEGIN TRANSACTION;' 152-out.sql; echo "COMMIT;" >> 152-out.sql;
sed -i '1iBEGIN TRANSACTION;' 153-out.sql; echo "COMMIT;" >> 153-out.sql;
sed -i '1iBEGIN TRANSACTION;' 154-out.sql; echo "COMMIT;" >> 154-out.sql;
sed -i '1iBEGIN TRANSACTION;' 155-out.sql; echo "COMMIT;" >> 155-out.sql;
sed -i '1iBEGIN TRANSACTION;' 156-out.sql; echo "COMMIT;" >> 156-out.sql;
sed -i '1iBEGIN TRANSACTION;' 157-out.sql; echo "COMMIT;" >> 157-out.sql;
sed -i '1iBEGIN TRANSACTION;' 158-out.sql; echo "COMMIT;" >> 158-out.sql;
sed -i '1iBEGIN TRANSACTION;' 159-out.sql; echo "COMMIT;" >> 159-out.sql;
sed -i '1iBEGIN TRANSACTION;' 160-out.sql; echo "COMMIT;" >> 160-out.sql;
sed -i '1iBEGIN TRANSACTION;' 161-out.sql; echo "COMMIT;" >> 161-out.sql;
sed -i '1iBEGIN TRANSACTION;' 162-out.sql; echo "COMMIT;" >> 162-out.sql;
sed -i '1iBEGIN TRANSACTION;' 163-out.sql; echo "COMMIT;" >> 163-out.sql;
sed -i '1iBEGIN TRANSACTION;' 164-out.sql; echo "COMMIT;" >> 164-out.sql;
sed -i '1iBEGIN TRANSACTION;' 165-out.sql; echo "COMMIT;" >> 165-out.sql;
sed -i '1iBEGIN TRANSACTION;' 166-out.sql; echo "COMMIT;" >> 166-out.sql;
sed -i '1iBEGIN TRANSACTION;' 167-out.sql; echo "COMMIT;" >> 167-out.sql;
sed -i '1iBEGIN TRANSACTION;' 168-out.sql; echo "COMMIT;" >> 168-out.sql;
sed -i '1iBEGIN TRANSACTION;' 169-out.sql; echo "COMMIT;" >> 169-out.sql;
sed -i '1iBEGIN TRANSACTION;' 170-out.sql; echo "COMMIT;" >> 170-out.sql;
sed -i '1iBEGIN TRANSACTION;' 171-out.sql; echo "COMMIT;" >> 171-out.sql;

cd ..
rm database.sqlite 
node loadfilestodb.js
ls -lh database.sqlite
# -rw-r--r-- 1 user user 3.0G Nov 28 14:16 database.sqlite

```

## The process-nodes.js file also creates:

- nodes.json (fll graph json format)
- nodes.bin (full graph binary format)
