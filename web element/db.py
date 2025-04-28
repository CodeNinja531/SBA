import sqlite3
import json
import cgi

def fetch_student_by_email(conn, email):
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM stu_info WHERE email = ?", (email,))
        row = cursor.fetchone()
        if row:
            return {
                "stu_id": row[0],
                "name": row[1],
                "clname": row[2],
                "clno": row[3],
                "gender": row[4],
                "dob": row[5],
                "house": row[6]
            }
        return None
    except Exception as e:
        print(f"Error fetching student by email: {e}")
        return None

def application(environ, start_response):
    try:
        # Parse query parameters
        params = cgi.parse_qs(environ['QUERY_STRING'])
        email = params.get('email', [None])[0]

        # Connect to the database
        conn = sqlite3.connect('database.db')

        if email:
            # Fetch student by email
            student_info = fetch_student_by_email(conn, email)
            response_body = json.dumps(student_info if student_info else {})
        else:
            response_body = json.dumps({"error": "Invalid or missing email parameter"})

        conn.close()

        # Send response
        start_response('200 OK', [('Content-Type', 'application/json')])
        return [response_body.encode('utf-8')]

    except Exception as e:
        # Log the error and return an error response
        print(f"Error in application: {e}")
        start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
        return [json.dumps({"error": "Internal server error"}).encode('utf-8')]
