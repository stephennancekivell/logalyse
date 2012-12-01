#!/bin/bash

TARGET=stephenn.info
TARGET_BASE=/var/www/p
TARGET_ARCHIVE=$TARGET_BASE/analyse.tgz
TARGET_LOCATION=$TARGET_BASE/analyse

case "$1" in
	deploy)
		echo "building"
		yeoman build
		if [ ! -d dist ];
		then
			echo "yeoman didnt build"
			exit 1
		fi
		cd dist
		tar -czf ../dist.tgz *
		cd ..

		echo "backing up"
		ssh $TARGET << EOF
			if [ -f $TARGET_ARCHIVE ];
			then
				mv $TARGET_ARCHIVE $TARGET_ARCHIVE.1
			fi
EOF

		echo "deploying"
		scp dist.tgz $TARGET:$TARGET_ARCHIVE

		ssh $TARGET << EOF
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
		
		ssh $TARGET << EOF
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
