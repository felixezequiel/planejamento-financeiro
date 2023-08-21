#!/bin/bash
echo "Waiting for startup.."

sleep 30

echo "done"

echo rs-init-test.sh time now: `date +"%T" `

mongosh --host mongodbtest0:27017 <<EOF
var cfg = {
    "_id": "rs0",
    "members": [
        {
            "_id": 0,
            "host": "mongodbtest0"
        },
        {
            "_id": 1,
            "host": "mongodbtest1"
        },
        {
            "_id": 2,
            "host": "mongodbtest2",
        }
    ]
};

rs.initiate(cfg);

rs.secondaryOk();

rs.status();
EOF
