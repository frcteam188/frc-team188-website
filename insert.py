import httplib

conn = httplib.HTTPConnection("frc-team188-website.herokuapp.com")

with open('schedule.csv') as f:
    lines = f.readlines()

for line in lines:
    values = line.split(",")

    payload = "{\n\t\"match_number\":" + values[0] + ",\n\t\"r1\":" + values[1]+ ",\n\t\"r2\":" + values[2]+ ",\n\t\"r3\":" + values[3] + ",\n\t\"b1\":" + values[4]+ ",\n\t\"b2\":" + values[5]+ ",\n\t\"b3\":" + values[6]+ "\n}"

    headers = {
        'content-type': "application/json",
        'cache-control': "no-cache",
        'postman-token': "6625798a-6fd0-9b7c-e45f-2625927a99f7"
        }

    conn.request("POST", "/scouting/api/insertMatch", payload, headers)

    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))
