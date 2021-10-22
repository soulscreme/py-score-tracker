export NODE_ENV=production
(cd py-score-tracker-backend && nohup flask run > backend.log.txt 2>&1 &)
(cd score-tracker-react-ui && nohup yarn start > frontend.log.txt 2>&1 &)
