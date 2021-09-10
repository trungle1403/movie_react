#run react app
npm run build

#move to build directory
cd build

#copy index.html to 200.html
cp index.html 200.html

#start and deploy
surge . xemphim-react-app.surge.sh