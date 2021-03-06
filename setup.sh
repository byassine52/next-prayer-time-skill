#!/usr/bin/env sh
#===============================================================================
#
#          FILE: ${0}
#
#         USAGE: ./${0}
#
#   DESCRIPTION: Setup project
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Yassine ElBadaoui (byassine52@users.noreply.github.com),
#  ORGANIZATION:
#       CREATED: 2018/06/25 16:00
#      REVISION:  ---
#===============================================================================

# set -o nounset  # Treat unset variables as an error
# set -o errexit  # Exit on the first error

_main() {
	echo "Installing Alexa-CLI:"
	yarn global add ask-cli
}

_main
