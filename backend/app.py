from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Connect to PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host="db",
        database="sample_database",
        user="postgres",
        password="password"
    )
    return conn

@app.route('/api/data', methods=['POST'])
def save_data():
    data = request.json
    name = data.get('name')
    email = data.get('email')

    conn = get_db_connection()
    cur = conn.cursor()

    # Insert data into the sample_table
    cur.execute("INSERT INTO sample (name, email) VALUES (%s, %s)", (name, email))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Data saved successfully!"}), 200

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    cur = conn.cursor()

    # Retrieve data from the sample_table
    cur.execute("SELECT * FROM sample")
    rows = cur.fetchall()

    # Create a list of dictionaries to store the retrieved data
    result = rows
    # for row in rows:
    #     result.append({
    #         'id': row[0],   # Assuming the first column is 'id'
    #         'name': row[1], # Assuming the second column is 'name'
    #         'email': row[2] # Assuming the third column is 'email'
    #     })

    cur.close()
    conn.close()

    return jsonify(result), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000,debug=True)
