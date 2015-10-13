## Contents

Timestamp: 09:08:22 2015-08-17
Dump of lessonlist test-databse using `mongodump -d lessonlist-dev` command.

# Restore: 

Uncompress zip and run `mongorestore lessonlist-dev/ -d lessonlist-dev lessonlist-dev/` to restore. Be sure to remove any previous databases with the same name prior to restore.

# Troubleshooting

If mongorestore fails to connect to the server, specify host with `--host=127.0.0.1`.