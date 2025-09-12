#!/bin/bash
#Name: ChatX Asset downloader
#Description: Download missing ChatX asset
#Author: dariusworks

#Read an Input from Keyboard
echo -n "What /asset/ "
read Assetname
echo
echo "So thats $Assetname"
wget https://ChatXapp.com/assets/$Assetname