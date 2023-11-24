set -e

yarn 
yarn workspace @glukees/webapp build
yarn workspace @glukees/api build
forever stop 0
sudo kill $(sudo lsof -t -i:3000)
sudo kill $(sudo lsof -t -i:4000)
forever start -c 'yarn start' ./
forever list
