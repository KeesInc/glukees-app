set -e

yarn 
sudo yarn workspace @glukees/webapp build
sudo yarn workspace @glukees/api build
sudo forever stop 1
sudo forever stop 0
sudo kill $(sudo lsof -t -i:3000)
sudo kill $(sudo lsof -t -i:4000)
sudo forever start -c 'sudo yarn workspace @glukees/api start' ./api
sudo forever start -c 'sudo yarn workspace @glukees/webapp start' ./webapp
sudo forever list
