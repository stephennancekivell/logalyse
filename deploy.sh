yeoman build
cd dist
tar -czf ../dist.tgz *
cd ..
scp dist.tgz stephenn.info:.
ssh stephenn.info sudo tar xfz dist.tgz -C /var/www/p/analyse
ssh stephenn.info rm dist.tgz
rm dist.tgz
