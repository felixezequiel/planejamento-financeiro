#!/bin/bash
echo "Waiting for startup.."

sleep 30

echo "done"

echo rs-init-dev.sh time now: `date +"%T" `

mongosh --host mongodb0:27017 <<EOF
var cfg = {
    "_id": "rs0",
    "members": [
        {
            "_id": 0,
            "host": "mongodb0"
        },
        {
            "_id": 1,
            "host": "mongodb1"
        },
        {
            "_id": 2,
            "host": "mongodb2",
        }
    ]
};
rs.initiate(cfg);

rs.secondaryOk();

rs.status();
EOF
