#!/bin/bash

TARGET_BASE=/var/www/p/test
TARGET_ARCHIVE=$TARGET_BASE/analyse.tgz
TARGET_LOCATION=$TARGET_BASE/analyse

case "$1" in
	deploy)
		echo "deploying"
		#yeoman build
		#cd dist
		#tar -czf ../dist.tgz *
		#cd ..

		echo "backing up"
		ssh stephenn.info << EOF
			if [ -f $TARGET_ARCHIVE ];
			then
				mv $TARGET_ARCHIVE $TARGET_ARCHIVE.1
			fi
EOF

		scp dist.tgz stephenn.info:$TARGET_ARCHIVE

		ssh stephenn.info << EOF
			echo "cleaning old deployment"
			rm -rf $TARGET_LOCATION/*

			echo "extracting new build"

			if [ -f $TARGET_LOCATION ];
			then
				mkdir $TARGET_LOCATION
			fi
			tar xfz $TARGET_ARCHIVE -C $TARGET_LOCATION
EOF

		;;
	rollback)
		echo "rolling back"
		
		ssh stephenn.info << EOF
			rm -rf $TARGET_LOCATION/*

			mv $TARGET_ARCHIVE.1 $TARGET_ARCHIVE
			tar xfz $TARGET_ARCHIVE -C $TARGET_LOCATION

EOF
		;;
	*)
		echo "usage: $0 [deploy] [rollback]"
		;;
esac
exit 0
