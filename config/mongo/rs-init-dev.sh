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
            "host": "mongodb0",
            "priority": 3
        },
        {
            "_id": 1,
            "host": "mongodb1",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "mongodb2",
            "priority": 1
        }
    ]
};
rs.initiate(cfg);

rs.secondaryOk();

db.getMongo().setReadPref('nearest');

rs.status();
EOF
