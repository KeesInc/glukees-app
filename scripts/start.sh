set -e

yarn 
yarn workspace @glukees/webapp build
yarn workspace @glukees/api build
sudo forever stop 1
sudo forever stop 0
sudo kill $(sudo lsof -t -i:3000)
sudo kill $(sudo lsof -t -i:4000)
sudo forever start -c 'yarn workspace @glukees/api start' ./
sudo forever start -c 'yarn workspace @glukees/webapp start' ./
sudo forever list
