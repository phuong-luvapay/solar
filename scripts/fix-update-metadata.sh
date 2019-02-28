#!/bin/bash
# Work-around for https://github.com/electron-userland/electron-builder/issues/2706

DIST_DIR=$(dirname "$0")/../electron/dist
METADATA_FILES=$(find "$DIST_DIR" -name 'latest*.yml')

for METADATA_FILE in $METADATA_FILES; do
  echo "Patching $METADATA_FILE..."
  VERSION=$(grep "version:" "$METADATA_FILE" | awk '{ print $2 }')

  sed -e "s/ satoshipay-stellar-wallet-setup-$VERSION[0-9A-Za-z\\._-]*\\./ Solar.Wallet.Setup.$VERSION./" -i "" "$METADATA_FILE"
  sed -e "s/ satoshipay-stellar-wallet-$VERSION[0-9A-Za-z\\._-]*\\./ Solar.Wallet.$VERSION./" -i "" "$METADATA_FILE"
done
