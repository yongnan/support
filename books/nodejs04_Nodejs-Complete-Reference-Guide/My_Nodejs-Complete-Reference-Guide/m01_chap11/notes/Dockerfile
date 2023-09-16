FROM node:10

ENV DEBUG="notes:*,messages:*"
ENV SEQUELIZE_CONNECT="models/sequelize-docker-mysql.yaml"
ENV NOTES_MODEL="sequelize"
ENV USER_SERVICE_URL="http://userauth:3333"
ENV PORT="3000"
ENV NOTES_SESSIONS_DIR="/sessions"

#ENV TWITTER_CONSUMER_KEY=${TWITTER_CONSUMER_KEY}
#ENV TWITTER_CONSUMER_SECRET=${TWITTER_CONSUMER_SECRET}
# Use this line when the Twitter Callback URL
# has to be other than localhost:3000
#ENV TWITTER_CALLBACK_HOST=${TWITTER_CALLBACK_HOST}
ENV TWITTER_CONSUMER_KEY=3MZpeqKY0D2YWyMFUDpBLrwy6
ENV TWITTER_CONSUMER_SECRET=W13i1ZTZ1Gc2S4KYV7imVVEP6VV54J0db0JtuSE7f2eXK0Ic8t
ENV TWITTER_CALLBACK_HOST=http://127.0.0.1:3000

RUN mkdir -p /notesapp /notesapp/minty /notesapp/partials /notesapp/public /notesapp/routes /notesapp/theme /notesapp/views
COPY minty/ /notesapp/minty/
COPY models/*.mjs models/sequelize-docker-mysql.yaml models/*.sql /notesapp/models/
COPY partials/ /notesapp/partials/
COPY public/ /notesapp/public/
COPY routes/ /notesapp/routes/
COPY theme/ /notesapp/theme/
COPY views/ /notesapp/views/
COPY dirname.js /notesapp/
COPY app.mjs package.json /notesapp/

WORKDIR /notesapp
RUN apt-get update -y \
&& apt-get -y install curl python build-essential git ca-certificates sqlite3 libsqlite3-dev \
&& npm install --unsafe-perm

# Uncomment to build the theme directory
# WORKDIR /notesapp/theme
# RUN npm run download && npm run build && npm run clean

WORKDIR /notesapp

VOLUME /sessions
EXPOSE 3000
CMD node --experimental-modules ./app
