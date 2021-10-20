from flask import Flask, Response, request, jsonify
from tinydb import TinyDB, Query
import re

app = Flask(__name__)
db = TinyDB('score_database.json')

@app.route("/api/v1/score/all/top")
def all_scores():
    topScores = {}
    for item in db:
        print (item)
        if item['game'] in topScores:
            if item['score'] > topScores[item['game']]['score']:
                topScores[item['game']] = {"name": item['name'], "score": item['score']}
        else:
            topScores[item['game']] = {"name": item['name'], "score": item['score']}
    
    return jsonify(topScores)

@app.route("/api/v1/score/<game>/top/<number>")
def game_scores(game, number):
    dbScores = Query()
    matchingScores = sorted(db.search(dbScores.game.test(cleanNameMatch, game)), key = lambda i: i['score'], reverse=True)
    
    return jsonify(matchingScores)

@app.route("/api/v1/games")
def list_games():
    uniqueGames = set()
    for item in db:
        uniqueGames.add(item['game'])

    return jsonify(sorted(uniqueGames))

@app.route("/api/v1/score", methods = ['POST'])
def post_score():
    db.insert(request.json)
    status_code = Response(status=201)
    return status_code

def cleanNameMatch(dbVal, targetVal):
    return cleanName(dbVal) == cleanName(targetVal)

def cleanName(name):
    print ('Name: ' + name)
    return re.sub('[^A-Za-z0-9]+', '', name).lower()
