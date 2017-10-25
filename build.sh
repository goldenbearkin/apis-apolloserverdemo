rm -rf ./build
tsc
cp -R ./src/types ./build/types
# cp ./favicon.ico ./build/favicon.ico
# cp ./robots.txt ./build/robots.txt