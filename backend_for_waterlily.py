
from flask import Flask,request,jsonify
from flask_cors import CORS
import bcrypt 
import mysql.connector
import time
import ast
from flask_jwt_extended import *

# initalize app
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret-key-that-should-be-randomized"
jwt = JWTManager(app)
CORS(app)

con = mysql.connector.connect(
    host="localhost",
    user="kp98",
    password="kp98",
    database="waterlily"
    
    )

@app.route("/sign_up", methods=["POST"])
def sign_up():
    # Get the JSON data from the request body
    try: 
        # data
        email_ = request.json.get('email')
        password_ = request.json.get('password')
        timestamp = time.time()
        
        # hashing
        password_ = password_.encode()
        salt = bcrypt.gensalt()
        hash_password = bcrypt.hashpw(password_, salt)
        
        # insert user
        string = "INSERT INTO users (email,password,date_) VALUES (%s,%s,%s)"
        values = (email_,password_,timestamp,)

        cur = con.cursor()
        cur.execute(string, values)
        con.commit()
        
        # get userID
        string = "SELECT userID FROM users WHERE email= %s"
        values = (email_,)
        cur.execute(string, values)
        userID = cur.fetchall()[0]
        
        # return token
        token = create_access_token(identity=str(userID))
        
        return jsonify(token)
        
    
    except Exception as e:
        print(e)
        return jsonify(e)

   
@app.route("/survey_data", methods=["POST"])
@jwt_required()
def survey_data():
    try: 
        # data
        data = request.json 
        
        birthday = request.json.get('1')
        gender = request.json.get('2')
        conditions = request.json.get('3')
        budget = request.json.get('4')
        userID = get_jwt_identity()
        userID = ast.literal_eval(userID)[0]
                
        
        # insert user
        string = "INSERT INTO survey_data (userID,birthday,gender,conditions,budget) VALUES (%s,%s,%s,%s,%s)"
        values = (userID,birthday,gender,conditions,budget)
    
        cur = con.cursor()
        cur.execute(string, values)
        con.commit()

        return jsonify(200)
      
  
    except Exception as e:
        print(e)
        return jsonify(e)
 
 


if __name__ == "__main__":
    app.run(debug=True, port=5000)











