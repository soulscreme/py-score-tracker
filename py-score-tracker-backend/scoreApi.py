from flask import Flask, Response, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from tinydb import TinyDB, Query
from werkzeug.utils import secure_filename
import re

app = Flask(__name__)
cors = CORS(app)
db = TinyDB('score_database.json')

app.config['UPLOAD_FOLDER'] = "/images"
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api/v1/score/all/top")
@cross_origin()
def all_scores():
    topScores = {}
    for item in db:
        if item['game'] in topScores:
            if item['score'] > topScores[item['game']]['score']:
                topScores[item['game']] = {"name": item['name'], "score": item['score']}
        else:
            topScores[item['game']] = {"name": item['name'], "score": item['score']}

    topScoreList = []
    for score in topScores.keys():
        topScoreList.append({
            "game": score,
            "name": topScores[score]['name'],
            "score": topScores[score]['score']
            })    
    return jsonify(topScoreList)

@app.route("/api/v1/score/<game>/top/<number>")
@cross_origin()
def game_scores(game, number):
    dbScores = Query()
    matchingScores = sorted(db.search(dbScores.game.test(cleanNameMatch, game)), key = lambda i: int(i['score']), reverse=True)
    
    return jsonify(matchingScores)

@app.route("/api/v1/score/<game>/delete", methods=['DELETE'])
@cross_origin()
def delete_score(game):
    dbScores = Query()
    print("Game: " + game)
    print("Args: ")
    print(request.args)
    print("Name: " + request.args.get('name'))
    print("Score: " + request.args.get('score'))
    remove = db.remove(dbScores.game.test(cleanNameMatch, game) & (dbScores.name == request.args.get('name')) & (dbScores.score == int(request.args.get('score'))))

    status_code = Response(status=201)
    return status_code

@app.route("/api/v1/score/all")
@cross_origin()
def all_games_all_scores():
    topScores = {}
    for item in db:
        if item['game'] in topScores:
            topScores[item['game']]['scores'].append({"name": item['name'], "score": item['score']})
        else:
            topScores[item['game']] = {"image": item['image'] if "image" in item else None, "scores": [{"name": item['name'], "score": item['score']}]}

    topScoreList = []
    for game in topScores.keys():
        topScoreList.append({
            "game": game,
            "image": topScores[game]['image'],
            "scores": topScores[game]['scores']
            })    
    return jsonify(topScoreList)

@app.route("/api/v1/games")
@cross_origin()
def list_games():
    uniqueGames = set()
    for item in db:
        uniqueGames.add(item['game'])

    return jsonify(sorted(uniqueGames))

@app.route("/api/v1/image/<game>", methods = ['POST', 'GET'])
@cross_origin()
def upload_game_image(game):
    gameQuery = Query()
    
    if request.method == 'POST':
        f = request.files['file']

        filename = cleanName(game) + "_" + secure_filename(f.filename)

        f.save("./image_uploads/" + filename)

        db.update({'image': filename}, gameQuery.game.test(cleanNameMatch, game))

        status_code = Response(status=201)
        return status_code
    else:
        rs = db.search(gameQuery.game.test(cleanNameMatch, game))

        if (len(rs) > 0) and ('image' in rs[0]):
            return send_file("./image_uploads/" + rs[0]['image'])
        else:
            status_code = Response(status=404)
            return status_code
    

@app.route("/api/v1/score", methods = ['POST'])
@cross_origin()
def post_score():
    db.insert(request.json)
    status_code = Response(status=201)
    return status_code

def cleanNameMatch(dbVal, targetVal):
    return cleanName(dbVal) == cleanName(targetVal)

def cleanName(name):
    print ('Name: ' + name)
    return re.sub('[^A-Za-z0-9]+', '', name).lower()
